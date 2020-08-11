const COLOR_GRADE_STEP = 40;

const baseColor1 = "#13334c";
const baseColor2 = "#005792";
const baseColor3 = "#f6f6e9";
const baseColor4 = "#fd5f00";

const neutralColor = "#888888";

export const shadowColor = "#0000002b";

export type Color = string;

export interface ColorScheme {
  color1: ColorGrading;
  color2: ColorGrading;
  color3: ColorGrading;
  color4: ColorGrading;
  neutral: ColorGrading;
}

export interface ColorGrading {
  light1: Color;
  light2: Color;
  light3: Color;
  light4: Color;
  base: Color;
  dark1: Color;
  dark2: Color;
  dark3: Color;
  dark4: Color;
}

interface RGBColorComponents {
  r: number;
  g: number;
  b: number;
}

const createColorGrading = (
  color: Color,
  gradingStep?: number
): ColorGrading => {
  const lightColors = createGradient(
    color,
    shadeColor(color, 4 * (gradingStep ? gradingStep : COLOR_GRADE_STEP)),
    5
  );
  const darkColors = createGradient(
    color,
    shadeColor(color, -4 * (gradingStep ? gradingStep : COLOR_GRADE_STEP)),
    5
  );

  return {
    base: color,
    dark1: darkColors[1],
    dark2: darkColors[2],
    dark3: darkColors[3],
    dark4: darkColors[4],
    light1: lightColors[1],
    light2: lightColors[2],
    light3: lightColors[3],
    light4: lightColors[4],
  };
};

const createColorScheme = (): ColorScheme => {
  return {
    color1: createColorGrading(baseColor1),
    color2: createColorGrading(baseColor2),
    color3: createColorGrading(baseColor3),
    color4: createColorGrading(baseColor4),
    neutral: createColorGrading(neutralColor, 69),
  };
};

const getRGBcomponents = (hexColor: Color): RGBColorComponents => {
  var r = parseInt(hexColor.substring(1, 3), 16);
  var g = parseInt(hexColor.substring(3, 5), 16);
  var b = parseInt(hexColor.substring(5, 7), 16);
  return { r, g, b };
};

function shadeColor(color: Color, amt: number) {
  const rgbComponents = getRGBcomponents(color);

  let r = rgbComponents.r + amt;
  let g = rgbComponents.g + amt;
  let b = rgbComponents.b + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var rr = r.toString(16).length === 1 ? "0" + r.toString(16) : r.toString(16);
  var gg = g.toString(16).length === 1 ? "0" + g.toString(16) : g.toString(16);
  var bb = b.toString(16).length === 1 ? "0" + b.toString(16) : b.toString(16);

  return "#" + rr + gg + bb;
}

const createGradient = (
  startColor: Color,
  endColor: Color,
  steps: number
): Color[] => {
  const startRgbComponents = getRGBcomponents(startColor);
  const endRgbComponents = getRGBcomponents(endColor);

  const gradientByColorPart = [
    [startRgbComponents.r, endRgbComponents.r],
    [startRgbComponents.g, endRgbComponents.g],
    [startRgbComponents.b, endRgbComponents.b],
  ].map((colorPart) => {
    const start = colorPart[0];
    const end = colorPart[1];
    const diff = end - start;
    const partGradient = [];
    for (let i = 0; i < steps; i++) {
      const stepValue = Math.round(start + (diff / (steps - 1)) * i);
      partGradient.push(
        stepValue.toString(16).length === 1
          ? "0" + stepValue.toString(16)
          : stepValue.toString(16)
      );
    }
    return partGradient;
  });

  return transpose(gradientByColorPart).map(
    (colorPart) => "#" + colorPart.join("")
  );
};

const transpose = (a: any[][]) => {
  return a[0].map((_, c) => {
    return a.map((r) => {
      return r[c];
    });
  });
};

export const Colors = createColorScheme();
