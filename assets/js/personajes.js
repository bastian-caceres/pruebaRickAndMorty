export default class Personajes{
    constructor(id){
        let _id = id;

        // closure
        this.getId = () => _id;
        this.setId = (nId) => _id = nId;
    };

    get id(){
        return this.getId();
    };

    set id(nId){
        this.setId(nId);
    };
}