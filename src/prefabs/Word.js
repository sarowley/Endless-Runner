class KeyComboObject {
    constructor(string, direction){
        //create key combo
        //console.log(string);
        this.string = string;
        this.direction = direction
    }
    swap_word(new_string){
        this.string = new_string;
    }
    print_word(string){
        console.log(string);
    }
    create_key(key_string){
        this.key = this.input.keyboard.createCombo(key_string, {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: true,     
            deleteOnMatch: false    
        });
    }

}