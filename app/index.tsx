import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer } from "expo-three";
import React, { useState } from "react";
import {
  AmbientLight,
  HemisphereLight,
  OrthographicCamera,
  PerspectiveCamera,
  PointLight,
  Scene,
} from "three";
import { loadModel } from "../utils/3d";
import { SafeAreaView } from "react-native-safe-area-context";

const modelGLB = {
  icebear: {
    type: "glb",
    name: "icebear",
    model: require("../models/icebear/icebear.glb"),
    isometric: false,
    textures: [
      {
        name: "polySurface10_lambert1_0",
        image: require("../models/icebear/lambert1_baseColor.xjpg"),
      },
      {
        name: "axepCube3_lambert4_0",
        image: require("../models/icebear/lambert4_baseColor.xjpg"),
      },
    ],
    scale: {
      x: 1,
      y: 1,
      z: 1,
    },
    position: {
      x: 0,
      y: 0,
      z: -2,
    },
    animation: {
      rotation: {
        y: 0.01, // to animate horizontally
      },
    },
  },
};

const modelOBJ = {
  hamburger: {
    type: "obj",
    name: "hamburger",
    isometric: false,
    model: require("../models/hamburger/Hamburger.obj"),
    textures: [{ image: require("../models/hamburger/burger.xpng") }],
    scale: {
      x: 0.5,
      y: 0.5,
      z: 0.5,
    },
    position: {
      x: 0,
      y: 0,
      z: 1,
    },
    animation: {
      rotation: {
        y: 0.01, // to animate horizontally
        x: 0.005, // to animate vertically
      },
    },
  },
};

const modelFBX = {
  shiba: {
    type: "fbx",
    name: "shiba",
    isometric: false,
    model: require("../models/shiba/shiba.fbx"),
    textures: [{ image: require("../models/shiba/default_Base_Color.xpng") }],
    scale: {
      x: 3,
      y: 3,
      z: 3,
    },
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    animation: {
      rotation: {
        y: 0.01, // to animate horizontally
      },
    },
  },
  icebear: {
    type: "fbx",
    name: "icebear",
    isometric: false,
    model: require("../models/icebear/source/icebear.fbx"),
    textures: [
      {
        name: "axepCube3",
        image: require("../models/icebear/textures/TXaxe.xjpg"),
      },
      {
        name: "polySurface10",
        image: require("../models/icebear/textures/TXpolar.xjpg"),
      },
    ],
    scale: {
      x: 1,
      y: 1,
      z: 1,
    },
    position: {
      x: 0,
      y: 0,
      z: -2,
    },
    animation: {
      rotation: {
        y: 0.01, // to animate horizontally
      },
    },
  },
};

const onContextCreate = async (gl: any, data: any) => {
  // const {setRenderer, setCamera, setScene} = data;
  const { selected } = data;
  const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
  const sceneColor = 0xabd2c3;
  // Create a WebGLRenderer without a DOM element
  const renderer = new Renderer({ gl });
  renderer.setSize(width, height);
  renderer.setClearColor(sceneColor);

  const isModelArray = selected?.models && Array.isArray(selected.models);

  let camera;
  if (selected.isometric) {
    // use this if wan isometric view
    var aspect = width / height;
    var d = 10;
    camera = new OrthographicCamera(-d * aspect, d * aspect, d, -d, -10, 1000);
  } else {
    // use this if wan normal view
    camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);
  }

  const scene = new Scene();

  const pointLight = new PointLight(0xffffff, 2, 1000, 1);
  pointLight.position.set(0, 30, 100);
  // scene.add(pointLight);

  // HemisphereLight - color feels nicer
  const hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(hemisphereLight);

  // AmbientLight - add more brightness?
  const ambientLight = new AmbientLight(0x404040); // soft white light
  scene.add(ambientLight);

  let models: any[] = [];

  if (isModelArray) {
    for (let i = 0; i < selected.models.length; i++) {
      const modelItem = selected.models[i];
      const model = await loadModel(modelItem);
      scene.add(model);
      models.push(model);
    }
  } else {
    const model = await loadModel(selected);
    scene.add(model);
    models.push(model);
  }

  function update() {
    if (isModelArray) {
      for (let i = 0; i < selected.models.length; i++) {
        if (models[i] && selected.models[i]?.animation) {
          if (selected.models[i].animation?.rotation?.x) {
            models[i].rotation.x += selected.models[i].animation?.rotation?.x;
          }
          if (selected.models[i].animation?.rotation?.y) {
            models[i].rotation.y += selected.models[i].animation?.rotation?.y;
          }
        }
      }
    } else {
      if (models[0] && selected?.animation) {
        if (selected.animation?.rotation?.x) {
          models[0].rotation.x += selected.animation?.rotation?.x;
        }
        if (selected.animation?.rotation?.y) {
          models[0].rotation.y += selected.animation?.rotation?.y;
        }
      }
    }
  }
  // Setup an animation loop
  const render = () => {
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };

  render();
};
interface Model {
  type: string;
  name: string;
  isometric?: boolean;
  model: any;
  textures: {
    image: any;
  }[];
  scale: {
    x: number;
    y: number;
    z: number;
  };
  position: {
    x: number;
    y: number;
    z: number;
  };
  animation: {
    rotation: {
      x?: number;
      y?: number;
    };
  };
}
const RNThree = (props: any) => {
  const models = [
    modelOBJ.hamburger,
    modelFBX.icebear,
    modelFBX.shiba,
    modelGLB.icebear,
  ];
  const [selected, setSelected] = useState<Model | null>(models[0]);
  const [gl, setGL] = useState<ExpoWebGLRenderingContext | null>(null);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {selected ? (
          <GLView
            style={{ flex: 1 }}
            onContextCreate={(gl) => {
              setGL(gl);
              onContextCreate(gl, { selected });
            }}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Loading...</Text>
          </View>
        )}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            flexDirection: "row",
            // alignItems: 'center',
            // justifyContent: 'center',
            position: "absolute",
            top: 10,
            left: 10,
            right: 0,
          }}
        >
          {models.map((x) => (
            <View key={`${x.name}-${x.type}`}>
              <TouchableOpacity
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#3389c5",
                  backgroundColor: selected === x ? "#3389c5" : "transparent",
                  padding: 10,
                  marginRight: 10,
                }}
                onPress={() => {
                  setSelected(null);
                  setTimeout(() => {
                    setSelected(x);
                  }, 200);
                }}
              >
                <Text>
                  {x.name} ({x.type})
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default RNThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#abd2c3",
  },
});
