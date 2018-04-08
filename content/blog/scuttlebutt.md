---
title: Eine Einführung in Scuttlebutt
date: 2018-04-08
tags: [soziale netzwerke, dezentral]
categories: [soziale netzwerke]
type: post
---

„[Scuttlebutt](https://www.scuttlebutt.nz/)“ ist ein dezentrales und
autonomes soziales Netzwerk. Ich werde zuerst ein paar Begriffe
erklären, dann das Protokoll vorstellen und zum Schluss einige
Anwendungen zeigen, die es gibt. 

## Begriffe

Ein soziales Netzwerk ist ein Assoziation von Menschen die auf
verschiedene Art und Weisen miteinandert kommunizieren. Es ist wichtig
anzumerken das es in einem sozialen Netzwerk um die Menschen geht und
nicht die Art und Weise wie diese kommunizieren. 

Dezentral heist, das es keine zentrale Authorität gibt, die bestimmt
welche Inhalte für das Netzwerk relevant sind. 

Autonom bedeutet das die Software auch ohne Internet funktioniert, da
die Benutzer direkt miteinander kommunizieren können, zum Beispiel
über [Freifunk](https://www.freifunk.net),
[Bluetooth](https://de.wikipedia.org/wiki/Bluetooth) oder ein [lokales
Netzwerk](https://de.wikipedia.org/wiki/Local_Area_Network).

Der Begriff „Scuttlebutt“ kommt aus der englischen Seemannssprache.
Ein „Scuttlebutt“ ist eine Tonne mit Trinkwasser, an der sich Seeleute
bedient haben. Da diese Tonne ein Treffpunkt für die Seeleute war,
wurden dort auch Informationen ausgetauscht. Das soziale Netzwerk
„Scuttlebutt“ ist im übertragenen Sinn die Wassertonne an denen sich die
Menschen treffen und ihre Neuigkeiten austauschen.

## Protokoll

In erster Linie ist „Scuttlebutt“ ein Protokoll. Ein Protokoll ist
eine definierte Satz von Regeln, die die Kommunikation zwischen zwei
Maschinen festlegt. 

Dieses basiert auf dem „[Gossip
Protocol](https://en.wikipedia.org/wiki/Gossip_protocol)“. Eine
vereinfachte Erleuterung geht so: In einem fikitiven Büro trifft Anja
Felix in der Küche und tratscht das Tim sehr verwildert aussieht weil
er seit Tagen seinen Bart nicht gepflegt hat. Etwas später trifft
Felix Wilma und Isa in der Küche und tratscht weiter das Tim seinen
Bart nicht pflegt. So haben Wilma und Isa die Information erhalten
obwohl sie nicht direkt mit Anja geredet haben. Bei „Scuttlebutt“
läuft das ähnlich, nur wird mit
„[Kryptographie](https://de.wikipedia.org/wiki/Kryptographie)“ sicher
gestellt, das die Informationen von Anja, auch wirklich von ihr
sind. Da im Internet, die Rechner der meisten Personen nicht von
anderen Rechnern erreichbar sind, können die Rechner nicht direkt
miteinander kommunizieren, sondern brauchen einen Mittelsmann. Im
„Scuttlebutt“-Universum nennt man diesen gemeinsamen Treffpunkt den
„Pub“, englisch für Kneipe. Die Kneipen werden von individuen
getragen, so betreibe ich auch eine Kneipe unter
[pub.datenknoten](https://pub.datenknoten).

Meistens werden Protokolle in Bibliotheken programmiert, damit
Anwendungen diese Bibliotheken benutzen können und jedes Programm das
komplette Protokoll implementieren muss. Implementierungen des
Protokolls sind die Bibliotheken
[scuttlebot](https://github.com/ssbc/scuttlebot) für JavaScript-Projekte oder auch
[ssb-client-rs](https://github.com/ssbc/ssb-client-rs) für Rust.


## Software

## Einordnung
