import Personajes from './personajes.js';

export default class DetallesPersonajes extends Personajes{
    constructor(id, name, species,gender,origin){
        super(id);
        let _name = name;
        let _species = species;
        this._gender = gender;
        this._origin = origin;

        this.getName = () => _name;
        this.setName = (nName) => _name = nName;

        this.getSpecies = () => _species;
        this.setSpecies = (nuevaSpecies) => _species = nuevaSpecies;
        
    }

    // name
    get name(){
        return this.getName();
    }
    set name(nName){
        this.setName(nName);
    }

    // specie
    get species(){
        return this.getSpecies();
    }
    set species(nSpecies){
        this.setSpecies(nSpecies);
    }

    get gender(){ 
        return this._gender; 
    }

    get origin(){
        return this._origin;
    }

    infoGeneral(){
        return `
            <ul>
                <li>id: ${this.id}</li>
                <li>${this.species}</li>
            </ul>
        `;        
    }
}