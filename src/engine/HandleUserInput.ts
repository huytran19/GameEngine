import { KEYS } from "@/utils"

export class HandleUserInput {
    registerKeyPress(keys: any[]): any[] {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            var key
            if (e.keyCode != 38 && e.keyCode != 40) {
                key = KEYS[0].toString()
            }
            else {key = KEYS[e.which].toString()
            if (key && keys.indexOf(key) === -1) {
                keys.unshift(key)
            }
        }
        })
        document.addEventListener('keyup', (e: KeyboardEvent) => {
            var key
            if (e.keyCode != 38 && e.keyCode != 40) {
                key = KEYS[0].toString()
            }
            else {
                key = KEYS[e.which].toString()
                var index = keys.indexOf(key)
                if (index > -1) {
                    keys.splice(index, 1)
                }
            }
        })
        return keys
    }
}