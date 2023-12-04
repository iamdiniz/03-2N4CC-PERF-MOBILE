import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  pokemonAdversary:any={
    name:'',
    image:'',
    abilities:'',
    height:'',
    weight:''

  }
  resultado:string = ''


  constructor(
    private pokeApiService:PokeApiService,
    public photoService:PhotoService
  ){ }
  ngOnInit(): void {
  }

  buscarPokemon(){
    this.pokeApiService.getPokeApiService()
      .subscribe(value => {
        this.pokemonAdversary.weight = JSON.parse(JSON.stringify(value))['weight'];
        this.pokemonAdversary.name = JSON.parse(JSON.stringify(value))['name'];
        this.pokemonAdversary.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemonAdversary.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemonAdversary.image = JSON.parse(JSON.stringify(value))['sprites'].other.dream_world.front_default;
        //
        this.pokeApiService.adversaryAbility = this.pokemonAdversary.abilities;
        console.log(this.pokeApiService.lastPokemonAbility)
        console.log(this.pokeApiService.adversaryAbility)
        this.setResultado();
      });
  }
  ionViewDidEnter(){
    this.buscarPokemon()
  }

  addPhotoToGallery(){
    this.photoService.addNewToGallery()
  }

  setResultado(){
     if(this.pokeApiService.adversaryAbility === this.pokeApiService.lastPokemonAbility){
        this.resultado = 'Empatou'
        this.pokeApiService.pokemon.empates = this.pokeApiService.pokemon.empates+1
        this.pokeApiService.pokemons[this.pokeApiService.pokemons.length-1].empates++
     }else if(this.pokeApiService.adversaryAbility > this.pokeApiService.lastPokemonAbility){
        this.resultado = 'Ganhou'
        this.pokeApiService.pokemon.derrotas = this.pokeApiService.pokemon.derrotas+1
        this.pokeApiService.pokemons[this.pokeApiService.pokemons.length-1].derrotas++
     }else{
        this.resultado = 'Perdeu'
        this.pokeApiService.pokemon.vitorias = this.pokeApiService.pokemon.vitorias+1
        this.pokeApiService.pokemons[this.pokeApiService.pokemons.length-1].vitorias++
     }
  }

}
