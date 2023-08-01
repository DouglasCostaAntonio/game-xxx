const tree = [
  {
    canvasId: "tree1Canvas",
    imageId: "tree1",
    frameX: 0,
    frameY: 0,
    width: 400,
    height: 470,
  },
  {
    canvasId: "tree2Canvas",
    imageId: "tree2",
    frameX: 0,
    frameY: 0,
    width: 550,
    height: 610,
  },
  {
    canvasId: "tree3Canvas",
    imageId: "tree3",
    frameX: 0,
    frameY: 0,
    width: 280,
    height: 305,
  },
  {
    canvasId: "tree4Canvas",
    imageId: "tree4",
    frameX: 0,
    frameY: 0,
    width: 435,
    height: 480,
  },
];

const sign = [
  {
    canvasId: "signRightCanvas",
    imageId: "sign",
    frameX: 0,
    frameY: 0,
    width: 52,
    height: 64,
  },
  {
    canvasId: "signDownCanvas",
    imageId: "sign",
    frameX: 1,
    frameY: 1,
    width: 52,
    height: 64,
  },
  {
    canvasId: "signDeathCanvas",
    imageId: "sign",
    frameX: 0,
    frameY: 1,
    width: 52,
    height: 64,
  },
  {
    canvasId: "signLeftCanvas",
    imageId: "sign",
    frameX: 1,
    frameY: 0,
    width: 52,
    height: 64,
  },
  {
    canvasId: "signUpCanvas",
    imageId: "sign",
    frameX: 0,
    frameY: 2,
    width: 52,
    height: 64,
  },
];

const baseGroundGrass = {
  imageId: "groundGrass",
  frameX: 0,
  frameY: 0,
  width: 100,
  height: 100, //43
};

const baseGroundCave = {
  imageId: "groundCave",
  frameX: 0,
  frameY: 0,
  width: 100,
  height: 100, //43
};

const baseGroundCaveGround = {
  imageId: "groundCaveGround",
  frameX: 0,
  frameY: 0,
  width: 100,
  height: 100, //43
};

const groundGrass = [
  {
    ...baseGroundGrass,
    canvasId: "groundGrass1Canvas",
    frameX: 0,
    frameY: 0,
  },
  {
    ...baseGroundGrass,
    canvasId: "groundGrass2Canvas",
    frameX: 1,
    frameY: 0,
  },
  {
    ...baseGroundGrass,
    canvasId: "groundGrass3Canvas",
    frameX: 2,
    frameY: 0,
  },
  //
  {
    ...baseGroundGrass,
    canvasId: "groundGrass4Canvas",
    frameX: 0,
    frameY: 1,
  },
  {
    ...baseGroundGrass,
    canvasId: "groundGrass5Canvas",
    frameX: 1,
    frameY: 1,
  },
  {
    ...baseGroundGrass,
    canvasId: "groundGrass6Canvas",
    frameX: 2,
    frameY: 1,
  },
  //
  {
    ...baseGroundGrass,
    canvasId: "groundGrass7Canvas",
    frameX: 0,
    frameY: 2,
  },
  {
    ...baseGroundGrass,
    canvasId: "groundGrass8Canvas",
    frameX: 1,
    frameY: 2,
  },
  {
    ...baseGroundGrass,
    canvasId: "groundGrass9Canvas",
    frameX: 2,
    frameY: 2,
  },
];

const groundplatformOne = [
  {
    canvasId: "platformOne1Canvas",
    imageId: "platform1",
    frameX: 0,
    frameY: 0,
    width: 100,
    height: 100,
  },
  {
    canvasId: "platformOne2Canvas",
    imageId: "platform1",
    frameX: 1,
    frameY: 0,
    width: 100,
    height: 100,
  },
  {
    canvasId: "platformOne3Canvas",
    imageId: "platform1",
    frameX: 2,
    frameY: 0,
    width: 100,
    height: 100,
  },
];

const groundplatformTwo = [
  {
    canvasId: "platformTwo1Canvas",
    imageId: "platform2",
    frameX: 0,
    frameY: 0,
    width: 100,
    height: 43,
  },
  {
    canvasId: "platformTwo2Canvas",
    imageId: "platform2",
    frameX: 1,
    frameY: 0,
    width: 100,
    height: 43,
  },
  {
    canvasId: "platformTwo3Canvas",
    imageId: "platform2",
    frameX: 2,
    frameY: 0,
    width: 100,
    height: 43,
  },
];

const groundplatformThree = [
  {
    canvasId: "platformThreeCanvas",
    imageId: "platform3",
    frameX: 0,
    frameY: 0,
    width: 150,
    height: 96,
  },
];

const groundCave = [
  {
    ...baseGroundCave,
    canvasId: "groundCave1Canvas",
    frameX: 0,
    frameY: 0,
  },
  {
    ...baseGroundCave,
    canvasId: "groundCave2Canvas",
    frameX: 1,
    frameY: 0,
  },
  {
    ...baseGroundCave,
    canvasId: "groundCave3Canvas",
    frameX: 2,
    frameY: 0,
  },
  //
  {
    ...baseGroundCave,
    canvasId: "groundCave4Canvas",
    frameX: 0,
    frameY: 1,
  },
  {
    ...baseGroundCave,
    canvasId: "groundCave5Canvas",
    frameX: 1,
    frameY: 1,
  },
  {
    ...baseGroundCave,
    canvasId: "groundCave6Canvas",
    frameX: 2,
    frameY: 1,
  },
  //
  {
    ...baseGroundCave,
    canvasId: "groundCave7Canvas",
    frameX: 0,
    frameY: 2,
  },
  {
    ...baseGroundCave,
    canvasId: "groundCave8Canvas",
    frameX: 1,
    frameY: 2,
  },
  {
    ...baseGroundCave,
    canvasId: "groundCave9Canvas",
    frameX: 2,
    frameY: 2,
  },
];

const groundCaveGround = [
  {
    ...baseGroundCaveGround,
    canvasId: "groundCaveGround1Canvas",
    frameX: 0,
    frameY: 0,
  },
  {
    ...baseGroundCaveGround,
    canvasId: "groundCaveGround2Canvas",
    frameX: 1,
    frameY: 0,
  },
  {
    ...baseGroundCaveGround,
    canvasId: "groundCaveGround3Canvas",
    frameX: 2,
    frameY: 0,
  },
  //
  {
    ...baseGroundCaveGround,
    canvasId: "groundCaveGround4Canvas",
    frameX: 0,
    frameY: 1,
  },
  {
    ...baseGroundCaveGround,
    canvasId: "groundCaveGround5Canvas",
    frameX: 1,
    frameY: 1,
  },
  {
    ...baseGroundCaveGround,
    canvasId: "groundCaveGround6Canvas",
    frameX: 2,
    frameY: 1,
  },
  //
  {
    ...baseGroundCaveGround,
    canvasId: "groundCaveGround7Canvas",
    frameX: 0,
    frameY: 2,
  },
  {
    ...baseGroundCaveGround,
    canvasId: "groundCaveGround8Canvas",
    frameX: 1,
    frameY: 2,
  },
  {
    ...baseGroundCaveGround,
    canvasId: "groundCaveGround9Canvas",
    frameX: 2,
    frameY: 2,
  },
];

export const scenarioObjs = [
  ...sign,
  ...tree,
  ...groundGrass,
  ...groundplatformOne,
  ...groundplatformTwo,
  ...groundplatformThree,
  ...groundCave,
  ...groundCaveGround,
];
