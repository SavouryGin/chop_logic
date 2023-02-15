const latexExpressions = {
  T: `$$\\mathfrak{T}$$`,
  R1Rn: `$\\{R_{1}, R_{2}, ..., R_{n}\\}$`,
  Ri: `$$R_{i}$$`,
  k: `$$k$$`,
  F: `$$F$$`,
  F1Fn: `$$F_{1}, F_{2}, ..., F_{n}$$`,
  G: `$$G$$`,
  Delta: `$$\\Delta$$`,
  Fi: `$$F_{i}$$`,
  Fn: `$$F_{n}$$`,
  DeltaToG: `$$\\Delta \\vdash G.$$`,
  DeltaToNothing: `$$\\Delta~=~\\varnothing$$`,
  toG: `$$\\vdash G$$`,
  IC: `$$F \\rightarrow (G \\rightarrow F)$$`,
  ID: `$$(F \\rightarrow (G \\rightarrow H)) \\rightarrow ((F \\rightarrow G) \\rightarrow (F \\rightarrow H))$$`,
  CR: `$$(\\neg G \\rightarrow \\neg F) \\rightarrow ((\\neg G \\rightarrow F) \\rightarrow G)$$`,
};

export default Object.freeze(latexExpressions);
