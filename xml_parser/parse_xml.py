#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pymongo
import xml.etree.ElementTree as ET
import html
import string

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["facsimile_db"]
mycol = mydb["facsimile_img_1"]

tree = ET.parse('15v_completo_TEST.xml')
root = tree.getroot()

def generate_char(ref, root):
    ch = "" 
    codepoint = ""
    diplomatic = ""
    for char in root[0].find("{http://www.tei-c.org/ns/1.0}encodingDesc").iter("{http://www.tei-c.org/ns/1.0}char"):
        if (char.attrib["{http://www.w3.org/XML/1998/namespace}id"] == ref):
            for mapping in char.findall("{http://www.tei-c.org/ns/1.0}mapping"):
                if (mapping.attrib["type"]=="diplomatic"):
                    ch = mapping.text                                 
    return (ch)


def generate_transcription(trans_ide, root):
    transcription = ""
    for ab in root[2].iter("{http://www.tei-c.org/ns/1.0}ab"):
        if (ab.attrib["{http://www.w3.org/XML/1998/namespace}id"] == trans_ide):
            if ab.text:
                transcription+= ab.text.replace("|", "\n")
            for child in ab:
                if (child.tag == "{http://www.tei-c.org/ns/1.0}g"):
                    ref = child.attrib["ref"][1:]
                    transcription+= generate_char(ref, root)
                if (child.text):
                    transcription+= child.text.replace("|", "\n")
                if (child.tail):
                    transcription+= child.tail.replace("|", "\n")
    return (transcription)


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
  
    

document = {"url": "https://api.digitale-sammlungen.de/iiif/image/v2/bsb00088332_00034/full/full/0/default.jpg", "name": "fol15v"}


for child in root[1][0]:
    if (child.tag == "{http://www.tei-c.org/ns/1.0}zone"):
        zone = child
        if "{http://www.w3.org/XML/1998/namespace}id" in zone.attrib:
            ide = string.capwords(zone.attrib["{http://www.w3.org/XML/1998/namespace}id"].replace("_", " "))
        
        if "points" in zone.attrib:
            points = generate_polygon(zone.attrib["points"])
        elif all(coord in zone.attrib for coord in ["lrx", "lry", "ulx", "uly"]):
            points = generate_polygon(zone.attrib["ulx"]+ "," + zone.attrib["uly"]+ " " + zone.attrib["lrx"]+ "," + zone.attrib["uly"]+ " " + zone.attrib["lrx"]+ "," + zone.attrib["lry"]+ " " + zone.attrib["ulx"]+ "," + zone.attrib["lry"])
            
        if "type" in zone.attrib:
            category = string.capwords(zone.attrib["type"].replace("_", " "))
            subcategory = ""
        elif "ana" in zone.attrib:
            category = string.capwords(zone.attrib["ana"][1:].replace("_", " "))
            subcategory = string.capwords(zone.attrib["corresp"][1:].replace("_", " "))
        
        if ("sameAs" in zone.attrib):
            trans_ide = zone.attrib["sameAs"][1:]
            transcription = generate_transcription (trans_ide, root)
        else:
            transcription = ""
        
        if (not category in document):
            document[category] = []

           
        document[category].append({"id": ide, "points": points, "subcategory": subcategory, "transcription": transcription})

mycol.insert_one(document)



            
            
            






