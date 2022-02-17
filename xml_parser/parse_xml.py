#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pymongo
import xml.etree.ElementTree as ET
import html
import string

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["facsimile_db"]
mycol = mydb["facsimile_img_3"]

tree = ET.parse('7r7v10r10v.xml')
root = tree.getroot()

def generate_char(ref, root):
    ch = "" 
    for char in root[0].find("{http://www.tei-c.org/ns/1.0}encodingDesc").iter("{http://www.tei-c.org/ns/1.0}char"):
        if (char.attrib["{http://www.w3.org/XML/1998/namespace}id"] == ref):
            for mapping in char.findall("{http://www.tei-c.org/ns/1.0}mapping"):
                if (mapping.attrib["type"]=="diplomatic"):
                    ch = mapping.text                                 
    return (ch)

def generate_hand(ref, root):
    hand = ""
    for interpGrp in root[0].iter("{http://www.tei-c.org/ns/1.0}interpGrp"):
        if (interpGrp.attrib["{http://www.w3.org/XML/1998/namespace}id"] == "hand"):
            for interp in interpGrp.iter("{http://www.tei-c.org/ns/1.0}interp"):
               if (interp.attrib["{http://www.w3.org/XML/1998/namespace}id"] == ref):
                   hand = interp.text 
    return (hand)

def generate_transcription(trans_ide, root):
    transcription = {}
    transcription["text"] = {}
    transcription["said"] = []
    transcription["style"] = ""
    transcription["type"] = ""
    transcription["lang"] = ""
    for ab in root[2].iter("{http://www.tei-c.org/ns/1.0}ab"):
        choice = ab.find("{http://www.tei-c.org/ns/1.0}choice")
        if (ab.attrib["{http://www.w3.org/XML/1998/namespace}id"] == trans_ide and choice != None):
            for option in choice:
                text = "" 
                if option.text:
                    text+= option.text.replace("|", "\n")
                for child in option:
                    if (child.tag == "{http://www.tei-c.org/ns/1.0}g"):
                        ref = child.attrib["ref"][1:]
                        text+= generate_char(ref, root)
                    if (child.text):
                        text+= child.text.replace("|", "\n")
                    if (child.tail):
                        text+= child.tail.replace("|", "\n")
                if (option.tag == "{http://www.tei-c.org/ns/1.0}orig"):
                    transcription['Orig'] = text
                if (option.tag == "{http://www.tei-c.org/ns/1.0}reg"):
                    transcription['Reg'] = text
        if "style" in ab.attrib:
            transcription["style"] = string.capwords(ab.attrib["style"].replace("_", " "))
        if "type" in ab.attrib:
            transcription["type"] = string.capwords(ab.attrib["type"].replace("_", " "))
        if "{http://www.w3.org/XML/1998/namespace}lang" in ab.attrib:
            transcription["lang"] = string.capwords(ab.attrib["{http://www.w3.org/XML/1998/namespace}lang"].replace("_", " "))
        #if ab.findall("{http://www.tei-c.org/ns/1.0}said"):
        for said in ab.findall("{http://www.tei-c.org/ns/1.0}said"):
            said_obj = {}
            if "who" in said.attrib:
                said_obj["who"] = said.attrib["who"][1:]
            if "toWhom" in said.attrib:
                said_obj["toWhom"] = said.attrib["toWhom"][1:]
            transcription["said"].append(said_obj)
    return (transcription)

def generate_category(cat_ide, root):
    category = string.capwords(cat_ide.replace("_", " "))
    for interpGrp in root[0].iter("{http://www.tei-c.org/ns/1.0}interpGrp"):
        if (interpGrp.attrib["{http://www.w3.org/XML/1998/namespace}id"] == cat_ide):
            for child in interpGrp:
                if (child.tag == "{http://www.tei-c.org/ns/1.0}desc"):
                    category = string.capwords(child.text)
    return (category)

def generate_subcategory(subcat_ide, root):
    subcategory = {}
    subcategory["desc"] = ""
    subcategory["name"] = ""
    if (subcat_ide != ""):
        subcategory["name"] = string.capwords(subcat_ide.replace("_", " "))
    for interp in root[0].iter("{http://www.tei-c.org/ns/1.0}interp"):
        if (interp.attrib["{http://www.w3.org/XML/1998/namespace}id"] == subcat_ide):
            if "sameAs" in interp.attrib:
                subcategory["desc"] = interp.attrib["sameAs"]
            else:
                subcategory["desc"] = interp.text
    """for person in root[0].iter("{http://www.tei-c.org/ns/1.0}person"):
        if (person.attrib["{http://www.w3.org/XML/1998/namespace}id"] == subcat_ide):
            subcategory["desc"] = {}
            if (person.find("{http://www.tei-c.org/ns/1.0}persName") != None):
                subcategory["desc"]["persName"] = string.capwords(person.find("{http://www.tei-c.org/ns/1.0}persName").text)
            if (person.find("{http://www.tei-c.org/ns/1.0}occupation") != None):
                subcategory["desc"]["occupation"] = string.capwords(person.find("{http://www.tei-c.org/ns/1.0}occupation").text)
            if (person.find("{http://www.tei-c.org/ns/1.0}sex") != None):
                subcategory["desc"]["sex"] = string.capwords(person.find("{http://www.tei-c.org/ns/1.0}sex").text)"""
    return (subcategory)

def generate_polygon(string):
    points = string.split(" ")
    poly  =  []
    for i in range(0,len(points)):
        coordinates = points[i]
        xcoor = int(coordinates.split(",")[0])
        ycoor = int(coordinates.split(",")[1])
        if (i==0):
            xcoor_first = xcoor
            ycoor_first = ycoor
        poly.append([xcoor, ycoor])
    poly.append([xcoor_first,ycoor_first])
    return poly;  
  

def generate_document(surface):
    document = {}
    name = ""
    url = ""

    # crea nome documento e url
    if "{http://www.w3.org/XML/1998/namespace}id" in surface.attrib:
        name = surface.attrib["{http://www.w3.org/XML/1998/namespace}id"]
    if "url" in surface.find("{http://www.tei-c.org/ns/1.0}graphic").attrib: 
        url = surface.find("{http://www.tei-c.org/ns/1.0}graphic").attrib["url"]
    
    document["name"] = name
    document["url"] = url

    # per ogni 'zone'
    for zone in surface.findall("{http://www.tei-c.org/ns/1.0}zone"):
        ide = ""
        points = ""
        category = {}
        subcategory = {}
        transcription = {}
        cat_ide = ""
        subcat_ide = ""
        trans_ide = ""

        # crea id
        if "{http://www.w3.org/XML/1998/namespace}id" in zone.attrib:
            ide = string.capwords(zone.attrib["{http://www.w3.org/XML/1998/namespace}id"].replace("_", " "))

        # crea poligono
        if "points" in zone.attrib:
            points = generate_polygon(zone.attrib["points"])
        elif all(coord in zone.attrib for coord in ["lrx", "lry", "ulx", "uly"]):
            points = generate_polygon(zone.attrib["ulx"]+ "," + zone.attrib["uly"]+ " " + zone.attrib["lrx"]+ "," + zone.attrib["uly"]+ " " + zone.attrib["lrx"]+ "," + zone.attrib["lry"]+ " " + zone.attrib["ulx"]+ "," + zone.attrib["lry"])
        
        # crea categoria e sottocategoria 
        if ("type" in zone.attrib):
            if (zone.attrib["type"] == "scene"):
                category = "Episode"
            else:
                category = string.capwords(zone.attrib["type"].replace("_", " "))
            if ("sameAs" in zone.attrib):
                subcat_ide = zone.attrib["sameAs"][1:]
        elif ("ana" in zone.attrib) and ("corresp" in zone.attrib):
            cat_ide = zone.attrib["ana"][1:]
            category = generate_category(cat_ide, root)
            subcat_ide = zone.attrib["corresp"][1:]

            # crea trascrizione
            if ("sameAs" in zone.attrib):
                trans_ide = zone.attrib["sameAs"][1:]
                
        transcription = generate_transcription (trans_ide, root)
        subcategory = generate_subcategory(subcat_ide, root) 
        
        if (not category in document):
            document[category] = []
        
        # inserisci 'zone' per ogni category
        document[category].append({"id": ide, "points": points, "subcategory": subcategory, "transcription": transcription})
    return document


def insert_documents(mycol): 
    for surface in root[1]:
        document = generate_document(surface)
        mycol.insert_one(document)
    print ("Documents inserted")

insert_documents(mycol)





            
            
            






