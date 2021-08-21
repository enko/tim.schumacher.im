---
tags: ["froscon","matrix","vortrag"]
categories: [technik]
date: "2021-08-21"
title: "Nachtrag zum FrOSCon Vortrag „Matrix Server Setup“"
type: "post"
---

Ich habe heute auf der [FrOSCon](https://www.froscon.de/) einen Vortrag wie man mittels [matrix-docker-ansible-deploy](https://github.com/spantaleev/matrix-docker-ansible-deploy) einen Matrix-Server aufsetzt.

Das Video werde ich hier auch mal noch verlinken, wenn es denn da ist.

Der Server unter froscon.datenknoten.me war innerhalb von 30 Minuten schnell aufgesetzt. Aber an der Föderation hat es dann gehapert. Das Problem war, das Matrix zur Förderation eine spezielle Datei `/.well-known/matrix/server` abfragt, aber unter der Domain nichts ausgeliefert wurde. Schlimmer noch, es wurde ein Zertifikat für `matrix.froscon.datenknoten.me` präsentiert, das dann zu Zertifikatsfehlern geführt hat. Des Rätsels Lösung war dann, das man dem Playbook sagen muss das es auch die Wurzeldomain `froscon.datenknoten.me` bespielen soll. Das kann man über die Variable `matrix_nginx_proxy_base_domain_serving_enabled` steuern. Wenn man diese auf `true` setzt, funktioniert die Föderation. Blöd nur das die ganzen anderen Server relativ stark cachen und das Problem dann noch einige Stunden weiter besteht.

So in der Retrospektive wäre es sinniger gewesen, den Vorgang von Anfang bis Ende im vorhinein mal durchzuspielen. Ich hätte aber auch die Dokumentation ordentlicher lesen könen, das hätte mich auch davor gerettet. Auf der Dokumentations-Seite zur [Installation](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs/installing.md#starting-the-services) steht ja explizit:

> Now that services are running, you need to finalize the installation process (**required for federation to work!**) by Configuring Service Discovery via .well-known (*Hervorhebung von mir*)

