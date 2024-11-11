export interface loginDTO {
  schoolNumber: string;
  password: string;
}

export interface loginVO {
  accessToken: string;
  refreshToken: string;
}

export interface signupDTO extends loginDTO {
  name: string;
  email: string;
}

export type fileDTO = FormData;

export interface fileVO {
  imageURL: string;
}

export interface userVO {
  schoolNumber: string;
  name: string;
  email: string;
  imageUrl: string | null;
}

export interface userDTO {
  data: undefined;
}

export interface emailDTO {
  email: string;
}
