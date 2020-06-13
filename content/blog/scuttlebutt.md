---
title: Eine Einführung in Scuttlebutt
date: 2018-04-08
tags: [soziale netzwerke, dezentral]
categories: [soziale netzwerke]
type: post
---

„[Scuttlebutt](https://www.scuttlebutt.nz/)“ ist ein dezentrales und
autonomes soziales Netzwerk. Dieses möchte ich hier vorstellen. Dafür werde ich zuerst ein paar Begriffe
erklären, darauffolgend das Protokoll vorstellen und zum Schluss einige
Anwendungen zeigen, die es gibt.

## Begriffe

„soziales Netzwerk“ — „dezentral“ — „autonom“ — „Scuttlebut“

Ein soziales Netzwerk kann als eine Assoziation von Menschen verstanden werden,
die auf verschiedene Arten miteinander kommunizieren. Es ist wichtig
anzumerken, dass in einem sozialen Netzwerk die Menschen im Fokus stehen und
weniger die Kommunikationsweise selbst.

Dezentral heißt hier, dass es keine zentrale Autorität gibt, die bestimmt,
welche Inhalte für das Netzwerk relevant sind.

Autonom bedeutet, dass die Software auch ohne Internet funktioniert, da
die Benutzer direkt miteinander kommunizieren können, zum Beispiel
über [Freifunk](https://www.freifunk.net),
[Bluetooth](https://de.wikipedia.org/wiki/Bluetooth) oder ein [lokales
Netzwerk](https://de.wikipedia.org/wiki/Local_Area_Network).

Der Begriff „Scuttlebutt“ kommt aus der englischen Seemannssprache.
Ein „Scuttlebutt“ ist eine Tonne mit Trinkwasser, an der sich Seeleute
bedient haben. Da diese Tonne ein Treffpunkt für die Seeleute war,
wurden dort auch Informationen ausgetauscht. Das soziale Netzwerk
„Scuttlebutt“ ist im übertragenen Sinn die Wassertonne, an welcher sich die
Menschen treffen und ihre Neuigkeiten austauschen.

## Protokoll

In erster Linie ist „Scuttlebutt“ ein Protokoll. Ein Protokoll ist
ein definierter Satz von Regeln, die die Kommunikation zwischen zwei
Maschinen festlegt.

Dieses basiert auf dem „[Gossip
Protocol](https://en.wikipedia.org/wiki/Gossip_protocol)“. Eine
vereinfachte Erläuterung geht so: In einem fiktiven Büro trifft Anja einen ihrer Freunde Felix in der Küche und tratscht darüber, dass Tim sehr verwildert aussieht,
weil er seit Tagen seinen Bart nicht gepflegt hat. Etwas später trifft
Felix seine Freundinnen Wilma und Isa in der Küche und tratscht weiter, dass Tim seinen
Bart nicht pflegt. So haben Wilma und Isa die Information erhalten,
obwohl sie nicht direkt mit Anja geredet haben. Bei „Scuttlebutt“
läuft das ähnlich, nur wird mit
„[Kryptographie](https://de.wikipedia.org/wiki/Kryptographie)“
sichergestellt, dass die Informationen von Anja auch wirklich von ihr
stammen und vollständig sind. Da die Rechner der meisten Personen im Internet nicht von
anderen Rechnern erreichbar sind, können die Rechner nicht direkt
miteinander kommunizieren, sondern brauchen einen Mittelsmann. Im
„Scuttlebutt“-Universum nennt man diesen gemeinsamen Treffpunkt den
„Pub“, englisch für Kneipe. Die Kneipen werden von Individuen
getragen, so betreibe ich auch eine Kneipe unter
[pub.datenknoten](https://pub.datenknoten).

Meistens werden Protokolle in Bibliotheken programmiert, damit
Anwendungen diese Bibliotheken benutzen können und jedes Programm das
komplette Protokoll implementieren muss. Implementierungen des
Protokolls sind die Bibliotheken
[scuttlebot](https://github.com/ssbc/scuttlebot) für JavaScript-Projekte oder auch
[ssb-client-rs](https://github.com/ssbc/ssb-client-rs) für Rust.


## Soziales Netzwerk

Ich habe bisher ja eher den technischen Bereich beschrieben, wieso
soll das ganze jetzt ein soziales Netzwerk sein? Im Kern von
Scuttlebutt kann man Nachrichten und Dateien austauschen. Es gibt
jetzt Programme wie [Patchwork](https://github.com/ssbc/patchwork)
oder auch [Patchbay](https://github.com/ssbc/patchbay) die bestimmte
Nachrichten-Typen verarbeiten. Der aktuelle Konsens sind folgende
Typen:

* `post`
* `about`
* `contact`
* `vote`

`post` ist ein Artikel, der aus Markdown besteht und in dem man auch andere
Nachrichten oder Dateien verlinken kann. Eine `post`-Nachricht kann
auch ein Kommentar auf einen anderen Artikel sein.

Der `about` Nachrichten-Typ erlaubt es hier, sich selbst zu
beschreiben. Man kann hier einen Namen, ein Bild oder einen
Beschreibungstext hinterlegen.

Mit `contact` deutet ein Mensch an, ob er einem anderen Konto folgt
oder blockiert.

Zum Schluss gibt es noch `vote`. Mit diesem Nachrichten-Typ kann man
andere Nachrichten beurteilen. Der Wert +1 ist um Zustimmung zu einem
zu bekunden. Mit dem Wert 0 kann man ein vorher gemachte +1 Abstimmung
rückgängig machen. Der Wert -1 wird momentan nicht genutzt, es ist
geplant damit Nachrichten zu markieren, z.B. das es sich um Spam oder
unsachgemäße Kommunikation handelt.

Ein Programm kann seinen eigenen Nachrichten-Typ implementieren,
dieser wird auch durch das Protokoll an andere Benutzer
weitergereicht. Wenn das Programm des Benutzers damit nichts anfangen
kann, dann wird die Nachricht nicht angezeigt.

## Fazit

Insgesamt finde ich "Scuttlebutt" als Medium zur medialen Vernetzung
sehr interessant, weil die Grundidee dem realweltlichen
Sozialverhalten anlehnt. Auch auf der technischen Entwicklungsebene
beobachte ich Veränderungen und bin sehr gespannt, was die nächste
Zeit so bringen wird.

Viel Spaß mit „Scuttlebut“!
