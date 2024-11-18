export interface loginDTO {
  school_number: string;
  password: string;
}

export interface loginVO {
  access_token: string;
  refresh_token: string;
}

export interface signupDTO extends loginDTO {
  name: string;
  email: string;
}

export type fileDTO = FormData;

export interface fileVO {
  image_url: string;
}

export interface userVO {
  school_number: string;
  name: string;
  email: string;
  image_url: string | null;
}

export interface userDTO {
  data: undefined;
}

export interface emailDTO {
  email: string;
}
