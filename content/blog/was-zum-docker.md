---
title: Was zum Docker
date: 2018-02-23
tags: [linux, docker, container]
categories: [technik]
type: post
---

Ein guter Freund von mir berichtete, dass er seit einem Docker-Update einen PostgreSQL-Container nicht mehr starten konnte, ihn deshalb löschen musste und dann seine Daten verloren gingen. Datenverlust ist nie lustig und aus diesem Grund will ich dem geneigten Leser einige Erfahrungen mit auf den Weg geben, die ich in den letzten anderthalb Jahren bei [meinem Arbeitgeber](http://www.flyacts.com) sammeln konnte.

## Container sind zustandslos und unveränderbar

### Was heißt „zustandslos“?

Zwar verhält es sich nicht immer so, dass Container zustandslos und unveränderbar sind, aber man sollte sie dennoch so betrachten. Damit wird dann die Frage aufgeworfen, wenn der Zustand der Anwendung nicht im Container gespeichert wird, wo wird er dann gespeichert? [Das Handbuch](https://docs.docker.com/storage/) gibt hier zwei Möglichkeiten vor:

* Volumes
* Bind-mount

#### docker volumes

Volumes sind [laut Dokumentation](https://docs.docker.com/storage/volumes/) der präferierte Weg den Zustand eines Containers zu persistieren. Meine persönliche Erfahrung ist eine andere. Ich benutze lieber bind mounts, da hier keine Verwaltung von nöten ist. Volumes kann ich auch wesentlich einfacher aus Versehen löschen, ein Ordner im Dateisystem erfordert mehr Aufwand.

#### bind mounts

Mittels eines „[bind mounts](https://unix.stackexchange.com/questions/198590/what-is-a-bind-mount/198591#198591)“ kann ich auf einem Linux-System einen Ordner auf einen anderen Ordner zeigen lassen, so dass beide über den selben Inhalt verfügen. So kann ein Ordner auf dem Hostsystem und in dem Docker-Container den selben Inhalt besitzen. Dadurch wird der Zustand des Containers außerhalb des Containers gespeichert und man kann ihn mit seinen regulären Werkzeugen sichern und beobachten.

### Was heißt „unveränderbar“?

Nachdem ich nun den Zustand der Datenbank außerhalb des Containers speichere, gilt es die zweite Eigenschaft „unveränderbar“ (engl immuteable) zu betrachten. Es ist zwar möglich einen Container zu bearbeiten, aber spätestens wenn man diesen Container löscht oder einen zweiten anlegt, wird sich das rächen, da die Änderung weg ist. Willst du wirklich eine Änderung an einem Container vornehmen, empfiehlt es sich, das dem Container zugrunde liegende Abbild zu modifizieren und in ein eigenes abzuspeichern.

## Aber ich kann doch nicht den Container löschen

Was mich am meisten verdutzt an der Aussage des Freundes war, dass das Löschen eines Containers so ein großer Akt ist. Auf Arbeit mache ich das ständig. Das liegt primär daran, dass wir mit [docker-compose](https://docs.docker.com/compose/) arbeiten und dies selbst für jeden kleinsten Dienst. Das Arbeiten mit compose hat den großen Vorteil, dass die Konfiguration der Docker Container in einer [YAML-Konfigurationsdatei](https://de.wikipedia.org/wiki/YAML) gespeichert ist und diese Datei über GIT versioniert ist.

## Einen Dienst mit `docker-compose` einrichten

Privat benutze ich für ein Projekt [odoo](https://www.odoo.com/) und verwende `docker-compose` für die Konfiguration der Anwendung. Hier meine komplette `docker-compose.yml`:

```yaml
version: '2'
services:
  web:
    image: odoo:10.0
    depends_on:
      - db
    volumes:
      - ./data:/var/lib/odoo
      - ./config:/etc/odoo
      - ./addons:/mnt/extra-addons
    ports:
      - "127.0.0.1:18069:8069"
    environment:
      - HOST=db
      - USER=odoo
      - PASSWORD=somethingrandom
  db:
    image: postgres:9.6
    volumes:
        - ./postgres:/usr/local/var/lib/postgresql
    environment:
        - "PGDATA=/usr/local/var/lib/postgresql"
        - "POSTGRES_PASSWORD=somethingrandom"
        - "POSTGRES_USER=odoo"
```

Ich habe hier 2 Container definiert. Einmal den Container `web` für die Anwendung an sich, in diesem Fall habe ich mit `image: odoo:10.0` ein Image [aus dem Hub](https://hub.docker.com) angegeben. Man könnte aber auch ein Dockerfile angeben, dann würde `docker-compose` zuerst das image bauen. Als nächstes habe ich mit `depends_on` definiert, dass der Container `web` von dem Container `db` abhängig ist. Das bedeuted auch, dass zuerst `db` gestartet wird und dann `web`. Ob die PostgreSQL-Datenbank so schnell hoch fährt, dass sie bereit ist, wenn die Anwendung sie benötigt ist unter Umständen nicht gegeben, kann also je nach Anwendungen zu Problemen führen und sollte im im Hinterkopf behalten werden. Im Fall von Odoo ist das allerdings kein Problem. Die Abhängigkeit bietet auch den Vorteil das compose einen Eintrag in der Datei `/etc/hosts` vornimmt, so dass man den Datenbank-Container mit seinem Namen referenzieren kann. Mit dem Eintrag `volumes` spezifiziere ich 3 bind mounts, die von dem lokalen Dateisystem in das Container Dateisystem zeigen. Über das Schlüsselwort `ports` kann ich Port-Weiterleitungen von dem Host-System in dem Container erstellen. Dabei sollte man beachten, dass man Ports immer lokal bindet und nicht auf allen Geräten zur Verfügung stellt. Über `environment` kann man zusätzliche Umgebungsvariablen in den Container reinreichen. Bei dem PostgreSQL-Image gibt es z.B. einige Variablen, mit denen man das Image konfigurieren kann.

Man startet die Komposition mit dem Befehl up:

```shell
$ docker-compose up
```

Wenn das System ordentlich hochfährt, kann man es mit STRG+C beenden und dann mit dem parameter `-d` starten, damit es im Hintergrund verschwindet:

```shell
$ docker-compose up -d
```

Will man die Dienste runterfahren, gibt es den Befehl `down`:

```shell
$ docker-compose down
```

Dabei werden sogar etwaige Container schon gelöscht. Aber da der komplette Zustand der beiden Container außerhalb im aktuellen Verzeichnis des Host-Systems gespeichert wird, ist das alles kein Problem.

## Fazit

Alles in allem hoffe ich, dass ich darlegen konnte, wieso Container zustandslos (stateless) und unveränderbar (immuteable) sein sollen. Zusätzlich sollte man sich immer bei Docker überlegen, wo sich die Daten befinden. Es ist nämlich schnell und sehr leicht passiert, dass die Daten im Container sind, weil man sich das Image nicht genau angesehen hat oder sich auch einfach nicht überlegt hat, wo die Daten sein könnten.
