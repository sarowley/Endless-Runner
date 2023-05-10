class KeyComboObject {
    constructor(string, direction){
        this.string = string;
        this.direction = direction
    }
    swap_word(new_string){
        this.string = new_string;
    }
    print_word(string){
        console.log(string);
    }
}