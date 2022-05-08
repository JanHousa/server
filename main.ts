// Server
let SerialNum = 0
let Odpovedi = [ {
    "cislo" : 0,
    "hlas" : "0",
}
]
_py.py_array_pop(Odpovedi)
let Hlasovani = false
radio.setGroup(158)
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    let hlas: string;
    let SerialNum: number;
    let Odpovedi: any[];
    let zmena: boolean;
    if (name == "odpoved") {
        hlas = String.fromCharCode(value)
        SerialNum = radio.receivedPacket(RadioPacketProperty.SerialNumber)
        Odpovedi = [ {
            "cislo" : SerialNum,
            "hlas" : hlas,
        }
        ]
        zmena = true
        for (let i of Odpovedi) {
            if (i["cislo"] == SerialNum) {
                i["hlas"] = hlas
                zmena = false
            }
            
            if (zmena == true) {
                Odpovedi.push( {
                    "cislo" : SerialNum,
                    "hlas" : hlas,
                }
                )
            }
            
        }
    }
    
})
basic.forever(function on_forever() {
    let vysledek: any;
    // Zápíná hlasování
    if (input.buttonIsPressed(Button.A)) {
        radio.sendValue("hanz", 10)
    }
    
    // Vypíná hlasování
    if (input.buttonIsPressed(Button.B)) {
        radio.sendValue("hanz", 20)
        vysledek = Odpovedi.find(function on_find(value: any, index: any): boolean {
            return true
        })
        console.log(vysledek)
    }
    
})
