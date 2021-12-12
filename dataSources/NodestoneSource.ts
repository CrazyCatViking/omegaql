import { Achievements, Character, CharacterSearch } from '@xivapi/nodestone';

// This will eventually replace the use of XIVApi, currently the parser is broken

export default class NodestoneSource {
  protected characterParser: Character;
  protected characterSearchParser: CharacterSearch;
  protected achievementParser: Achievements;
  
  constructor() {
    this.characterParser = new Character();
    this.characterSearchParser = new CharacterSearch();
    this.achievementParser = new Achievements();
  }
}