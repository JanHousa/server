#Server
SerialNum = 0
Odpovedi = [{"cislo": 0, "hlas": "0"}]
Odpovedi.pop()
Hlasovani = False
radio.set_group(158)

def on_received_value(name, value):
    if name == "odpoved":
        hlas = String.from_char_code(value)
        SerialNum = radio.received_packet(RadioPacketProperty.SERIAL_NUMBER)
        Odpovedi = [{"cislo": SerialNum, "hlas": hlas}]
        zmena = True
        for i in Odpovedi:
            if i["cislo"] == SerialNum:
                i["hlas"] = hlas 
                zmena = False
            if zmena == True:
                Odpovedi.push({"cislo": SerialNum, "hlas": hlas})
radio.on_received_value(on_received_value)

def on_find(value, index):
    return True

def on_forever():
    #Zápíná hlasování
    if input.button_is_pressed(Button.A):
        radio.send_value("hanz", 10)
    #Vypíná hlasování
    if input.button_is_pressed(Button.B):
        radio.send_value("hanz", 20)
        vysledek = Odpovedi.find(on_find)
        print(vysledek)
basic.forever(on_forever)