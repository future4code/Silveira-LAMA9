export class Band {
  constructor(
    private id: string,
    private name: string,
    private musicGenre: string,
    private responsible: string
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getMusicGenre() {
    return this.musicGenre;
  }
  getResponsible() {
    return this.responsible;
  }

  static toBandModel(band: any): Band {
    return new Band(band.id, band.name, band.musicGenre, band.responsible);
  }
}

export interface BandInputDTO {
  name: string;
  musicGenre: string;
  responsible: string;
  accessToken: string;
}

export interface BandDetailDTO {
  name: string;
  id: string;
}
