export const Actions = {
  TOKEN_DECODED: 'TOKEN_DECODED'
};

export const tokenDecoded = (decodedToken) => {
  return {
    type: Actions.TOKEN_DECODED,
    decodedToken: decodedToken
  };
};
