export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type MovieDetailResponse = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  poster_path: string;
  backdrop_path: string;
  genres: Genre[];
  vote_average: number;
  tagline: string;
  homepage: string;
  status: string;
  spoken_languages: SpokenLanguage[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  budget: number;
  popularity: number;
};
