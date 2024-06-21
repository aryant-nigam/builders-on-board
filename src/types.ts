export interface Iuser {
  id: number;
  is_builder: boolean;
}

export interface DecodedToken {
  csrf: string;
  exp: number;
  fresh: boolean;
  iat: number;
  jti: string;
  nbf: number;
  sub: Iuser;
  type: string;
}
