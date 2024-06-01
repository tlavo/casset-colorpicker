import React, { useState, useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color'
import rgbHex from "rgb-hex";
import './App.css';

//REACT COLORPICKER
function ColorPicker({ color, onChange }) {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [hex, setHex] = useState(color);

  const pickerRef = useRef(null);
  const buttonRef = useRef(null);

  const handleChange = (color) => {
    setHex("#" + rgbHex(color.rgb.r, color.rgb.g, color.rgb.b, color.rgb.a));
    onChange("#" + rgbHex(color.rgb.r, color.rgb.g, color.rgb.b, color.rgb.a));
  };

  const handleClickOutside = (event) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setPickerVisible(false);
    }
  };

  const handleClick = () => {
    setPickerVisible(!pickerVisible);
  };

  useEffect(() => {
    if (pickerVisible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [pickerVisible]);

  useEffect(() => {
    setHex(color); // Update hex state when color prop changes
  }, [color]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button
        ref={buttonRef}
        style={{ backgroundColor: hex, height: '2vw', width: '4vw' }}
        onClick={handleClick}
      >
      </button>
      {pickerVisible && (
        <div ref={pickerRef} style={{ marginTop: '2vw', position: 'absolute' }}>
          <SketchPicker color={hex} onChange={handleChange}/>
        </div>
      )}
    </div>
  );
}

function App() {
  //GHOST VARIABLES
  const [color, setColor] = useState('#000000');
  const [hex, setHex] = useState('#000000');

  //CASSET VARIABLES
  const [color1, setColor1] =  useState('#676C78'); // top trapezoid
  const [color2, setColor2] =  useState('#3B404E'); // main color
  const [color3, setColor3] =  useState('#B0B3B9'); // tertiary color
  const [color4, setColor4] =  useState('#2D2F35'); // secondary color
  // for html colorpicker
  const [hex1, setHex1] = useState('#676C78');
  const [hex2, setHex2] = useState('#3B404E');
  const [hex3, setHex3] = useState('#B0B3B9');
  const [hex4, setHex4] = useState('#2D2F35');

  //HTML COLORPICKER
  // const handleColorChange = (event) => {
  //   const color = event.target.value;
  //   setHex(color);
  //   setColor(color);
  // };

  // const handleColor1Change = (event) => {
  //   const color = event.target.value;
  //   setHex1(color);
  //   setColor1(color);
  // };

  // const handleColor2Change = (event) => {
  //   const color = event.target.value;
  //   setHex2(color);
  //   setColor2(color);
  // };

  // const handleColor3Change = (event) => {
  //   const color = event.target.value;
  //   setHex3(color);
  //   setColor3(color);
  // };
  
  // const handleColor4Change = (event) => {
  //   const color = event.target.value;
  //   setHex4(color);
  //   setColor4(color);
  // };

  // NOTE: maybe use this when the user picks a dark color like black or "within some range"
  const lightenColor = (hexColor, percent) => {
    // Convert hex to RGB
    let r = parseInt(hexColor.substr(1, 2), 16);
    let g = parseInt(hexColor.substr(3, 2), 16);
    let b = parseInt(hexColor.substr(5, 2), 16);

    // Calculate the amount to increase each RGB component
    let delta = 255 * (percent / 100);

    // Add the delta to each RGB component
    r = Math.min(255, r + delta);
    g = Math.min(255, g + delta);
    b = Math.min(255, b + delta);

    // Convert back to hex
    return `#${Math.round(r).toString(16)}${Math.round(g).toString(16)}${Math.round(b).toString(16)}`;
  };

  const darkenColor = (hexColor, percent) => {
    // Convert hex to RGB
    let r = parseInt(hexColor.substr(1, 2), 16);
    let g = parseInt(hexColor.substr(3, 2), 16);
    let b = parseInt(hexColor.substr(5, 2), 16);

    // Calculate the amount to decrease each RGB component
    let delta = 255 * (percent / 100);

    // Reduce the intensity of each RGB component
    r = Math.max(0, Math.round(r - delta));
    g = Math.max(0, Math.round(g - delta));
    b = Math.max(0, Math.round(b - delta));

    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  //GHOST SAVE
  // const handleSaveImage = () => {
  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');
  
  //   // Set canvas size to fit the entire pixelart
  //   canvas.width = 800; // Adjust width based on the size of your pixelart
  //   canvas.height = 800; // Adjust height based on the size of your pixelart
  
  //   // Clear canvas
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  //   // OLD: Defining manually
  //   // Define the box shadow offsets of the ghost's pixels
  //   // const boxShadowOffsets = [
  //   //   [-1, -7], [0, -7], [1, -7], 
  //   //   [2, -7], [3, -7], [4, -7], 
  //   //   [-2, -6], [3, -6], [-3, -5],
  //   //   [3, -5], [-3, -4], [-1, -4], 
  //   //   [1, -4], [4, -4], [-3, -3], 
  //   //   [4, -3], [-6, -2], [-5, -2],
  //   //   [-4, -2], [-1, -2], [0, -2], 
  //   //   [1, -2], [5, -2], [6, -2], 
  //   //   [7, -2], [-6, -1], [7, -1], 
  //   //   [-5, 0], [6, 0], [-4, 1],
  //   //   [5, 1], [-4, 2], [4, 2], 
  //   //   [-4, 3], [4, 3], [-3, 4], 
  //   //   [4, 4], [-2, 5], [3, 5], 
  //   //   [-1, 6], [0, 6], [3, 6], 
  //   //   [1, 7], [2, 7], [3, 7], 
  //   //   [4, 7]
  //   // ];

  //   // NEW: Grabbing offsets from actual style component
  //   // Get boxShadow style from ghostStyle
  //   const boxShadow = ghostStyle.boxShadow;

  //   // Parse boxShadow to extract offset values
  //   const boxShadowOffsets = boxShadow.match(/-?\d+rem/g).map((value, index, array) => {
  //     if (index % 2 === 0) {
  //       return [parseFloat(array[index]), parseFloat(array[index + 1])];
  //     }
  //   }).filter(offset => offset !== undefined);
  
  //   console.log(boxShadowOffsets);

  //   // Set pixel size based on canvas size and number of pixels
  //   const pixelSize = canvas.width / 16; // 16x16 grid
  
  //   // Draw each pixel of the ghost pattern on the canvas
  //   boxShadowOffsets.forEach(([xOffset, yOffset]) => {
  //     const pixelX = (xOffset + 6) * pixelSize; // Adjusted for canvas centering
  //     const pixelY = (yOffset + 8) * pixelSize; // Adjusted for canvas centering
  //     ctx.fillStyle = color;
  //     ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize);
  //   });
  
  //   // Convert canvas content to data URL
  //   const dataURL = canvas.toDataURL('image/png');
  
  //   // Create temporary link element
  //   const link = document.createElement('a');
  //   link.href = dataURL;
  //   link.download = 'pixel_art_ghost.png';
  
  //   // Trigger download
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };  

  //CASSET SAVE
  const handleSaveImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to fit the entire pixelart
    canvas.width = 385; // Adjust width based on the size of Jacobs cassets
    canvas.height = 245; // Adjust height based on the size of Jacobs cassets

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get boxShadow style from cassetStyle
    const boxShadow = cassetStyle.boxShadow;

    // Parse boxShadow to extract offset values and colors
    const boxShadowOffsets = [];
    const boxShadowColors = [];

    // Pattern for offsets
    const offsetRegex = /(-?\d+)px\s+(-?\d+)px/;

    // Pattern for hexadecimal colors and color variables
    const hexAndVariablesRegex = /#(?:[a-fA-F\d]{3,6}|[a-fA-F\d]{8})\b|\b\w+\b/g;

    const parts = boxShadow.split(/,\s*/);
    parts.forEach(part => {
      const offsetMatch = part.match(offsetRegex);
      const colorMatches = part.match(hexAndVariablesRegex);
      console.log(colorMatches);

      if (offsetMatch && colorMatches) {
        const xOffset = parseInt(offsetMatch[1]);
        const yOffset = parseInt(offsetMatch[2]);
        const color = colorMatches[colorMatches.length - 1]; // Take the last match which should be the color
        boxShadowOffsets.push([xOffset, yOffset]);
        boxShadowColors.push(color);
      }
    });

    console.log(boxShadowOffsets);
    console.log(boxShadowColors);

    // Set scale factor to increase the size of the image
    const scaleFactor = 1.4; // Adjusted to be same as custom cassets made by Jacob

    // Set pixel size based on canvas size and number of pixels
    const pixelSize = 5 * scaleFactor; // From CSS predefined * scaleFactor

    // Draw each pixel of the ghost pattern on the canvas
    boxShadowOffsets.forEach(([xOffset, yOffset], index) => {
        const pixelX = (xOffset - 5) * scaleFactor;
        const pixelY = (yOffset - 5) * scaleFactor;
        ctx.fillStyle = boxShadowColors[index];
        ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize);
    });

    // Convert canvas content to data URL
    const dataURL = canvas.toDataURL('image/png');

    // Create temporary link element
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'pixel_art_casset.png';

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetImage = () => {
    setColor1('#676C78');
    setColor2('#3B404E');
    setColor3('#B0B3B9');
    setColor4('#2D2F35');
    setHex1('#676C78');
    setHex2('#3B404E');
    setHex3('#B0B3B9');
    setHex4('#2D2F35');
  }

  const ghostStyle = {
    boxShadow: `
      -1rem -7rem ${color}, 0rem -7rem ${color}, 1rem -7rem ${color}, 
      2rem -7rem ${color}, 3rem -7rem ${color}, 4rem -7rem ${color}, 
      -2rem -6rem ${color}, 3rem -6rem ${color}, -3rem -5rem ${color}, 
      3rem -5rem ${color}, -3rem -4rem ${color}, -1rem -4rem ${darkenColor(color, 20)},
      1rem -4rem ${darkenColor(color, 20)}, 4rem -4rem ${color}, -3rem -3rem ${color}, 
      4rem -3rem ${color}, -6rem -2rem ${color}, -5rem -2rem ${color}, 
      -4rem -2rem ${color}, -1rem -2rem ${darkenColor(color, 20)}, 0rem -2rem ${darkenColor(color, 20)}, 
      1rem -2rem ${darkenColor(color, 20)}, 5rem -2rem ${color}, 6rem -2rem ${color}, 
      7rem -2rem ${color}, -6rem -1rem ${color}, 7rem -1rem ${color}, 
      -5rem 0rem ${color}, 6rem 0rem ${color}, -4rem 1rem ${color}, 
      5rem 1rem ${color}, -4rem 2rem ${color}, 4rem 2rem ${color},
      -4rem 3rem ${color}, 4rem 3rem ${color}, -3rem 4rem ${color},
      4rem 4rem ${color}, -2rem 5rem ${color}, 3rem 5rem ${color}, 
      -1rem 6rem ${color}, 0rem 6rem ${color}, 3rem 6rem ${color}, 
      1rem 7rem ${color}, 2rem 7rem ${color}, 3rem 7rem ${color}, 
      4rem 7rem ${color}
    `,
  };

  const cassetStyle = {
    boxShadow: `
      10px 5px 0 0 ${darkenColor(color2,20)}, 15px 5px 0 0 ${darkenColor(color2,20)}, 20px 5px 0 0 ${darkenColor(color2,20)}, 25px 5px 0 0 ${darkenColor(color2,20)},
      30px 5px 0 0 ${darkenColor(color2,20)}, 35px 5px 0 0 ${darkenColor(color2,20)}, 40px 5px 0 0 ${darkenColor(color2,20)}, 45px 5px 0 0 ${darkenColor(color2,20)},
      50px 5px 0 0 ${darkenColor(color2,20)}, 55px 5px 0 0 ${darkenColor(color2,20)}, 60px 5px 0 0 ${darkenColor(color2,20)}, 65px 5px 0 0 ${darkenColor(color2,20)},
      70px 5px 0 0 ${darkenColor(color2,20)}, 75px 5px 0 0 ${darkenColor(color2,20)}, 80px 5px 0 0 ${darkenColor(color2,20)}, 85px 5px 0 0 ${darkenColor(color2,20)},
      90px 5px 0 0 ${darkenColor(color2,20)}, 95px 5px 0 0 ${darkenColor(color2,20)}, 100px 5px 0 0 ${darkenColor(color2,20)}, 105px 5px 0 0 ${darkenColor(color2,20)},
      110px 5px 0 0 ${darkenColor(color2,20)}, 115px 5px 0 0 ${darkenColor(color2,20)}, 120px 5px 0 0 ${darkenColor(color2,20)}, 125px 5px 0 0 ${darkenColor(color2,20)},
      130px 5px 0 0 ${darkenColor(color2,20)}, 135px 5px 0 0 ${darkenColor(color2,20)}, 140px 5px 0 0 ${darkenColor(color2,20)}, 145px 5px 0 0 ${darkenColor(color2,20)},
      150px 5px 0 0 ${darkenColor(color2,20)}, 155px 5px 0 0 ${darkenColor(color2,20)}, 160px 5px 0 0 ${darkenColor(color2,20)}, 165px 5px 0 0 ${darkenColor(color2,20)},
      170px 5px 0 0 ${darkenColor(color2,20)}, 175px 5px 0 0 ${darkenColor(color2,20)}, 180px 5px 0 0 ${darkenColor(color2,20)}, 185px 5px 0 0 ${darkenColor(color2,20)},
      190px 5px 0 0 ${darkenColor(color2,20)}, 195px 5px 0 0 ${darkenColor(color2,20)}, 200px 5px 0 0 ${darkenColor(color2,20)}, 205px 5px 0 0 ${darkenColor(color2,20)},
      210px 5px 0 0 ${darkenColor(color2,20)}, 215px 5px 0 0 ${darkenColor(color2,20)}, 220px 5px 0 0 ${darkenColor(color2,20)}, 225px 5px 0 0 ${darkenColor(color2,20)},
      230px 5px 0 0 ${darkenColor(color2,20)}, 235px 5px 0 0 ${darkenColor(color2,20)}, 240px 5px 0 0 ${darkenColor(color2,20)}, 245px 5px 0 0 ${darkenColor(color2,20)},
      250px 5px 0 0 ${darkenColor(color2,20)}, 255px 5px 0 0 ${darkenColor(color2,20)}, 260px 5px 0 0 ${darkenColor(color2,20)}, 265px 5px 0 0 ${darkenColor(color2,20)},
      270px 5px 0 0 ${darkenColor(color2,20)}, 5px 10px 0 0 ${darkenColor(color2,20)}, 10px 10px 0 0 ${darkenColor(color2,20)}, 15px 10px 0 0 ${darkenColor(color2,20)},
      20px 10px 0 0 ${darkenColor(color2,20)}, 25px 10px 0 0 ${darkenColor(color2,20)}, 30px 10px 0 0 ${darkenColor(color2,20)}, 35px 10px 0 0 ${darkenColor(color2,20)},
      40px 10px 0 0 ${darkenColor(color2,20)}, 45px 10px 0 0 ${darkenColor(color2,20)}, 50px 10px 0 0 ${color1}, 55px 10px 0 0 ${color1},
      60px 10px 0 0 ${color1}, 65px 10px 0 0 ${color1}, 70px 10px 0 0 ${color1}, 75px 10px 0 0 ${color1},
      80px 10px 0 0 ${color1}, 85px 10px 0 0 ${color1}, 90px 10px 0 0 ${color1}, 95px 10px 0 0 ${color1},
      100px 10px 0 0 ${color1}, 105px 10px 0 0 ${color1}, 110px 10px 0 0 ${color1}, 115px 10px 0 0 ${color1},
      120px 10px 0 0 ${color1}, 125px 10px 0 0 ${color1}, 130px 10px 0 0 ${color1}, 135px 10px 0 0 ${color1},
      140px 10px 0 0 ${color1}, 145px 10px 0 0 ${color1}, 150px 10px 0 0 ${color1}, 155px 10px 0 0 ${color1},
      160px 10px 0 0 ${color1}, 165px 10px 0 0 ${color1}, 170px 10px 0 0 ${color1}, 175px 10px 0 0 ${color1},
      180px 10px 0 0 ${color1}, 185px 10px 0 0 ${color1}, 190px 10px 0 0 ${color1}, 195px 10px 0 0 ${color1},
      200px 10px 0 0 ${color1}, 205px 10px 0 0 ${color1}, 210px 10px 0 0 ${color1}, 215px 10px 0 0 ${color1},
      220px 10px 0 0 ${color1}, 225px 10px 0 0 ${color1}, 230px 10px 0 0 ${color1}, 235px 10px 0 0 ${darkenColor(color2,20)},
      240px 10px 0 0 ${darkenColor(color2,20)}, 245px 10px 0 0 ${darkenColor(color2,20)}, 250px 10px 0 0 ${darkenColor(color2,20)}, 255px 10px 0 0 ${darkenColor(color2,20)},
      260px 10px 0 0 ${darkenColor(color2,20)}, 265px 10px 0 0 ${darkenColor(color2,20)}, 270px 10px 0 0 ${darkenColor(color2,20)}, 275px 10px 0 0 ${darkenColor(color2,20)},
      5px 15px 0 0 ${darkenColor(color2,20)}, 10px 15px 0 0 ${darkenColor(color2,20)}, 15px 15px 0 0 ${darkenColor(color2,20)}, 20px 15px 0 0 ${color1},
      25px 15px 0 0 ${color2}, 30px 15px 0 0 ${color2}, 35px 15px 0 0 ${color2}, 40px 15px 0 0 ${color2},
      45px 15px 0 0 ${darkenColor(color2,20)}, 50px 15px 0 0 ${color1}, 55px 15px 0 0 ${color1}, 60px 15px 0 0 ${color1},
      65px 15px 0 0 ${darkenColor(color2,20)}, 70px 15px 0 0 ${color1}, 75px 15px 0 0 ${color1}, 80px 15px 0 0 ${color1},
      85px 15px 0 0 ${color1}, 90px 15px 0 0 ${color1}, 95px 15px 0 0 ${color1}, 100px 15px 0 0 ${color1},
      105px 15px 0 0 ${color1}, 110px 15px 0 0 ${color1}, 115px 15px 0 0 ${color1}, 120px 15px 0 0 ${color1},
      125px 15px 0 0 ${color1}, 130px 15px 0 0 ${color1}, 135px 15px 0 0 ${color1}, 140px 15px 0 0 ${color1},
      145px 15px 0 0 ${color1}, 150px 15px 0 0 ${color1}, 155px 15px 0 0 ${color1}, 160px 15px 0 0 ${color1},
      165px 15px 0 0 ${color1}, 170px 15px 0 0 ${color1}, 175px 15px 0 0 ${color1}, 180px 15px 0 0 ${color1},
      185px 15px 0 0 ${color1}, 190px 15px 0 0 ${color1}, 195px 15px 0 0 ${color1}, 200px 15px 0 0 ${color1},
      205px 15px 0 0 ${color1}, 210px 15px 0 0 ${color1}, 215px 15px 0 0 ${darkenColor(color2,20)}, 220px 15px 0 0 ${color1},
      225px 15px 0 0 ${color1}, 230px 15px 0 0 ${color1}, 235px 15px 0 0 ${darkenColor(color2,20)}, 240px 15px 0 0 ${color2},
      245px 15px 0 0 ${color2}, 250px 15px 0 0 ${color2}, 255px 15px 0 0 ${color2}, 260px 15px 0 0 ${color1},
      265px 15px 0 0 ${darkenColor(color2,20)}, 270px 15px 0 0 ${darkenColor(color2,20)}, 275px 15px 0 0 ${darkenColor(color2,20)}, 5px 20px 0 0 ${darkenColor(color2,20)},
      10px 20px 0 0 ${darkenColor(color2,20)}, 15px 20px 0 0 ${color1}, 20px 20px 0 0 ${color1}, 25px 20px 0 0 ${color1},
      30px 20px 0 0 ${color2}, 35px 20px 0 0 ${color2}, 40px 20px 0 0 ${color2}, 45px 20px 0 0 ${darkenColor(color2,20)},
      50px 20px 0 0 ${color1}, 55px 20px 0 0 ${color1}, 60px 20px 0 0 ${darkenColor(color2,20)}, 65px 20px 0 0 ${color1},
      70px 20px 0 0 ${darkenColor(color2,20)}, 75px 20px 0 0 ${color1}, 80px 20px 0 0 ${color1}, 85px 20px 0 0 ${color1},
      90px 20px 0 0 ${darkenColor(color2,20)}, 95px 20px 0 0 ${color1}, 100px 20px 0 0 ${color1}, 105px 20px 0 0 ${color1},
      110px 20px 0 0 ${color1}, 115px 20px 0 0 ${color1}, 120px 20px 0 0 ${color1}, 125px 20px 0 0 ${color1},
      130px 20px 0 0 ${color1}, 135px 20px 0 0 ${color1}, 140px 20px 0 0 ${color1}, 145px 20px 0 0 ${color1},
      150px 20px 0 0 ${color1}, 155px 20px 0 0 ${color1}, 160px 20px 0 0 ${color1}, 165px 20px 0 0 ${color1},
      170px 20px 0 0 ${color1}, 175px 20px 0 0 ${color1}, 180px 20px 0 0 ${color1}, 185px 20px 0 0 ${color1},
      190px 20px 0 0 ${darkenColor(color2,20)}, 195px 20px 0 0 ${color1}, 200px 20px 0 0 ${color1}, 205px 20px 0 0 ${color1},
      210px 20px 0 0 ${darkenColor(color2,20)}, 215px 20px 0 0 ${color1}, 220px 20px 0 0 ${darkenColor(color2,20)}, 225px 20px 0 0 ${color1},
      230px 20px 0 0 ${color1}, 235px 20px 0 0 ${darkenColor(color2,20)}, 240px 20px 0 0 ${color2}, 245px 20px 0 0 ${color2},
      250px 20px 0 0 ${color2}, 255px 20px 0 0 ${color1}, 260px 20px 0 0 ${color1}, 265px 20px 0 0 ${color1},
      270px 20px 0 0 ${darkenColor(color2,20)}, 275px 20px 0 0 ${darkenColor(color2,20)}, 5px 25px 0 0 ${darkenColor(color2,20)}, 10px 25px 0 0 ${darkenColor(color2,20)},
      15px 25px 0 0 ${color2}, 20px 25px 0 0 ${color1}, 25px 25px 0 0 ${color2}, 30px 25px 0 0 ${color2},
      35px 25px 0 0 ${color2}, 40px 25px 0 0 ${color2}, 45px 25px 0 0 ${color2}, 50px 25px 0 0 ${darkenColor(color2,20)},
      55px 25px 0 0 ${color1}, 60px 25px 0 0 ${color1}, 65px 25px 0 0 ${darkenColor(color2,20)}, 70px 25px 0 0 ${color1},
      75px 25px 0 0 ${color1}, 80px 25px 0 0 ${color1}, 85px 25px 0 0 ${darkenColor(color2,20)}, 90px 25px 0 0 ${color1},
      95px 25px 0 0 ${darkenColor(color2,20)}, 100px 25px 0 0 ${color1}, 105px 25px 0 0 ${color1}, 110px 25px 0 0 ${color1},
      115px 25px 0 0 ${color1}, 120px 25px 0 0 ${color1}, 125px 25px 0 0 ${color1}, 130px 25px 0 0 ${color1},
      135px 25px 0 0 ${color1}, 140px 25px 0 0 ${color1}, 145px 25px 0 0 ${color1}, 150px 25px 0 0 ${color1},
      155px 25px 0 0 ${color1}, 160px 25px 0 0 ${color1}, 165px 25px 0 0 ${color1}, 170px 25px 0 0 ${color1},
      175px 25px 0 0 ${color1}, 180px 25px 0 0 ${color1}, 185px 25px 0 0 ${darkenColor(color2,20)}, 190px 25px 0 0 ${color1},
      195px 25px 0 0 ${darkenColor(color2,20)}, 200px 25px 0 0 ${color1}, 205px 25px 0 0 ${color1}, 210px 25px 0 0 ${color1},
      215px 25px 0 0 ${darkenColor(color2,20)}, 220px 25px 0 0 ${color1}, 225px 25px 0 0 ${color1}, 230px 25px 0 0 ${darkenColor(color2,20)},
      235px 25px 0 0 ${color2}, 240px 25px 0 0 ${color2}, 245px 25px 0 0 ${color2}, 250px 25px 0 0 ${color2},
      255px 25px 0 0 ${color2}, 260px 25px 0 0 ${color1}, 265px 25px 0 0 ${color2}, 270px 25px 0 0 ${darkenColor(color2,20)},
      275px 25px 0 0 ${darkenColor(color2,20)}, 5px 30px 0 0 ${darkenColor(color2,20)}, 10px 30px 0 0 ${darkenColor(color2,20)}, 15px 30px 0 0 ${color2},
      20px 30px 0 0 ${color2}, 25px 30px 0 0 ${color2}, 30px 30px 0 0 ${color2}, 35px 30px 0 0 ${color2},
      40px 30px 0 0 ${color2}, 45px 30px 0 0 ${color2}, 50px 30px 0 0 ${color2}, 55px 30px 0 0 ${darkenColor(color2,20)},
      60px 30px 0 0 ${color1}, 65px 30px 0 0 ${color1}, 70px 30px 0 0 ${color1}, 75px 30px 0 0 ${color1},
      80px 30px 0 0 ${color1}, 85px 30px 0 0 ${color1}, 90px 30px 0 0 ${darkenColor(color2,20)}, 95px 30px 0 0 ${color1},
      100px 30px 0 0 ${color1}, 105px 30px 0 0 ${color1}, 110px 30px 0 0 ${color1}, 115px 30px 0 0 ${color1},
      120px 30px 0 0 ${color1}, 125px 30px 0 0 ${color1}, 130px 30px 0 0 ${color1}, 135px 30px 0 0 ${color1},
      140px 30px 0 0 ${color1}, 145px 30px 0 0 ${color1}, 150px 30px 0 0 ${color1}, 155px 30px 0 0 ${color1},
      160px 30px 0 0 ${color1}, 165px 30px 0 0 ${color1}, 170px 30px 0 0 ${color1}, 175px 30px 0 0 ${color1},
      180px 30px 0 0 ${color1}, 185px 30px 0 0 ${color1}, 190px 30px 0 0 ${darkenColor(color2,20)}, 195px 30px 0 0 ${color1},
      200px 30px 0 0 ${color1}, 205px 30px 0 0 ${color1}, 210px 30px 0 0 ${color1}, 215px 30px 0 0 ${color1},
      220px 30px 0 0 ${color1}, 225px 30px 0 0 ${darkenColor(color2,20)}, 230px 30px 0 0 ${color2}, 235px 30px 0 0 ${color2},
      240px 30px 0 0 ${color2}, 245px 30px 0 0 ${color2}, 250px 30px 0 0 ${color2}, 255px 30px 0 0 ${color2},
      260px 30px 0 0 ${color2}, 265px 30px 0 0 ${color2}, 270px 30px 0 0 ${darkenColor(color2,20)}, 275px 30px 0 0 ${darkenColor(color2,20)},
      5px 35px 0 0 ${darkenColor(color2,20)}, 10px 35px 0 0 ${darkenColor(color2,20)}, 15px 35px 0 0 ${color2}, 20px 35px 0 0 ${color2},
      25px 35px 0 0 ${color2}, 30px 35px 0 0 ${color2}, 35px 35px 0 0 ${color2}, 40px 35px 0 0 ${color2},
      45px 35px 0 0 ${color2}, 50px 35px 0 0 ${color2}, 55px 35px 0 0 ${darkenColor(color2,20)}, 60px 35px 0 0 ${color1},
      65px 35px 0 0 ${color1}, 70px 35px 0 0 ${color1}, 75px 35px 0 0 ${color1}, 80px 35px 0 0 ${color1},
      85px 35px 0 0 ${color1}, 90px 35px 0 0 ${color1}, 95px 35px 0 0 ${color1}, 100px 35px 0 0 ${color1},
      105px 35px 0 0 ${color1}, 110px 35px 0 0 ${color1}, 115px 35px 0 0 ${color1}, 120px 35px 0 0 ${color1},
      125px 35px 0 0 ${color1}, 130px 35px 0 0 ${color1}, 135px 35px 0 0 ${color1}, 140px 35px 0 0 ${color1},
      145px 35px 0 0 ${color1}, 150px 35px 0 0 ${color1}, 155px 35px 0 0 ${color1}, 160px 35px 0 0 ${color1},
      165px 35px 0 0 ${color1}, 170px 35px 0 0 ${color1}, 175px 35px 0 0 ${color1}, 180px 35px 0 0 ${color1},
      185px 35px 0 0 ${color1}, 190px 35px 0 0 ${color1}, 195px 35px 0 0 ${color1}, 200px 35px 0 0 ${color1},
      205px 35px 0 0 ${color1}, 210px 35px 0 0 ${color1}, 215px 35px 0 0 ${color1}, 220px 35px 0 0 ${color1},
      225px 35px 0 0 ${darkenColor(color2,20)}, 230px 35px 0 0 ${color2}, 235px 35px 0 0 ${color2}, 240px 35px 0 0 ${color2},
      245px 35px 0 0 ${color2}, 250px 35px 0 0 ${color2}, 255px 35px 0 0 ${color2}, 260px 35px 0 0 ${color2},
      265px 35px 0 0 ${color2}, 270px 35px 0 0 ${darkenColor(color2,20)}, 275px 35px 0 0 ${darkenColor(color2,20)}, 5px 40px 0 0 ${darkenColor(color2,20)},
      10px 40px 0 0 ${darkenColor(color2,20)}, 15px 40px 0 0 ${color2}, 20px 40px 0 0 ${color2}, 25px 40px 0 0 ${color2},
      30px 40px 0 0 ${color2}, 35px 40px 0 0 ${color2}, 40px 40px 0 0 ${color2}, 45px 40px 0 0 ${color2},
      50px 40px 0 0 ${color2}, 55px 40px 0 0 ${color2}, 60px 40px 0 0 ${darkenColor(color2,20)}, 65px 40px 0 0 ${darkenColor(color2,20)},
      70px 40px 0 0 ${darkenColor(color2,20)}, 75px 40px 0 0 ${darkenColor(color2,20)}, 80px 40px 0 0 ${darkenColor(color2,20)}, 85px 40px 0 0 ${darkenColor(color2,20)},
      90px 40px 0 0 ${darkenColor(color2,20)}, 95px 40px 0 0 ${darkenColor(color2,20)}, 100px 40px 0 0 ${darkenColor(color2,20)}, 105px 40px 0 0 ${darkenColor(color2,20)},
      110px 40px 0 0 ${darkenColor(color2,20)}, 115px 40px 0 0 ${darkenColor(color2,20)}, 120px 40px 0 0 ${darkenColor(color2,20)}, 125px 40px 0 0 ${darkenColor(color2,20)},
      130px 40px 0 0 ${darkenColor(color2,20)}, 135px 40px 0 0 ${darkenColor(color2,20)}, 140px 40px 0 0 ${darkenColor(color2,20)}, 145px 40px 0 0 ${darkenColor(color2,20)},
      150px 40px 0 0 ${darkenColor(color2,20)}, 155px 40px 0 0 ${darkenColor(color2,20)}, 160px 40px 0 0 ${darkenColor(color2,20)}, 165px 40px 0 0 ${darkenColor(color2,20)},
      170px 40px 0 0 ${darkenColor(color2,20)}, 175px 40px 0 0 ${darkenColor(color2,20)}, 180px 40px 0 0 ${darkenColor(color2,20)}, 185px 40px 0 0 ${darkenColor(color2,20)},
      190px 40px 0 0 ${darkenColor(color2,20)}, 195px 40px 0 0 ${darkenColor(color2,20)}, 200px 40px 0 0 ${darkenColor(color2,20)}, 205px 40px 0 0 ${darkenColor(color2,20)},
      210px 40px 0 0 ${darkenColor(color2,20)}, 215px 40px 0 0 ${darkenColor(color2,20)}, 220px 40px 0 0 ${darkenColor(color2,20)}, 225px 40px 0 0 ${color2},
      230px 40px 0 0 ${color2}, 235px 40px 0 0 ${color2}, 240px 40px 0 0 ${color2}, 245px 40px 0 0 ${color2},
      250px 40px 0 0 ${color2}, 255px 40px 0 0 ${color2}, 260px 40px 0 0 ${color2}, 265px 40px 0 0 ${color2},
      270px 40px 0 0 ${darkenColor(color2,20)}, 275px 40px 0 0 ${darkenColor(color2,20)}, 5px 45px 0 0 ${darkenColor(color2,20)}, 10px 45px 0 0 ${darkenColor(color2,20)},
      15px 45px 0 0 ${color2}, 20px 45px 0 0 ${color2}, 25px 45px 0 0 ${color2}, 30px 45px 0 0 ${color2},
      35px 45px 0 0 ${color2}, 40px 45px 0 0 ${color2}, 45px 45px 0 0 ${color2}, 50px 45px 0 0 ${color2},
      55px 45px 0 0 ${color2}, 60px 45px 0 0 ${color2}, 65px 45px 0 0 ${color2}, 70px 45px 0 0 ${color2},
      75px 45px 0 0 ${color2}, 80px 45px 0 0 ${color2}, 85px 45px 0 0 ${color2}, 90px 45px 0 0 ${color2},
      95px 45px 0 0 ${color2}, 100px 45px 0 0 ${color2}, 105px 45px 0 0 ${color2}, 110px 45px 0 0 ${color2},
      115px 45px 0 0 ${color2}, 120px 45px 0 0 ${color2}, 125px 45px 0 0 ${color2}, 130px 45px 0 0 ${color2},
      135px 45px 0 0 ${color2}, 140px 45px 0 0 ${color2}, 145px 45px 0 0 ${color2}, 150px 45px 0 0 ${color2},
      155px 45px 0 0 ${color2}, 160px 45px 0 0 ${color2}, 165px 45px 0 0 ${color2}, 170px 45px 0 0 ${color2},
      175px 45px 0 0 ${color2}, 180px 45px 0 0 ${color2}, 185px 45px 0 0 ${color2}, 190px 45px 0 0 ${color2},
      195px 45px 0 0 ${color2}, 200px 45px 0 0 ${color2}, 205px 45px 0 0 ${color2}, 210px 45px 0 0 ${color2},
      215px 45px 0 0 ${color2}, 220px 45px 0 0 ${color2}, 225px 45px 0 0 ${color2}, 230px 45px 0 0 ${color2},
      235px 45px 0 0 ${color2}, 240px 45px 0 0 ${color2}, 245px 45px 0 0 ${color2}, 250px 45px 0 0 ${color2},
      255px 45px 0 0 ${color2}, 260px 45px 0 0 ${color2}, 265px 45px 0 0 ${color2}, 270px 45px 0 0 ${darkenColor(color2,20)},
      275px 45px 0 0 ${darkenColor(color2,20)}, 5px 50px 0 0 ${darkenColor(color2,20)}, 10px 50px 0 0 ${darkenColor(color2,20)}, 15px 50px 0 0 ${color2},
      20px 50px 0 0 ${color2}, 25px 50px 0 0 ${color2}, 30px 50px 0 0 ${color2}, 35px 50px 0 0 ${color2},
      40px 50px 0 0 ${color2}, 45px 50px 0 0 ${color2}, 50px 50px 0 0 ${color2}, 55px 50px 0 0 ${color2},
      60px 50px 0 0 ${color2}, 65px 50px 0 0 ${color2}, 70px 50px 0 0 ${color2}, 75px 50px 0 0 ${color2},
      80px 50px 0 0 ${color2}, 85px 50px 0 0 ${color2}, 90px 50px 0 0 ${color2}, 95px 50px 0 0 ${color2},
      100px 50px 0 0 ${color2}, 105px 50px 0 0 ${color2}, 110px 50px 0 0 ${color2}, 115px 50px 0 0 ${color2},
      120px 50px 0 0 ${color2}, 125px 50px 0 0 ${color2}, 130px 50px 0 0 ${color2}, 135px 50px 0 0 ${color2},
      140px 50px 0 0 ${color2}, 145px 50px 0 0 ${color2}, 150px 50px 0 0 ${color2}, 155px 50px 0 0 ${color2},
      160px 50px 0 0 ${color2}, 165px 50px 0 0 ${color2}, 170px 50px 0 0 ${color2}, 175px 50px 0 0 ${color2},
      180px 50px 0 0 ${color2}, 185px 50px 0 0 ${color2}, 190px 50px 0 0 ${color2}, 195px 50px 0 0 ${color2},
      200px 50px 0 0 ${color2}, 205px 50px 0 0 ${color2}, 210px 50px 0 0 ${color2}, 215px 50px 0 0 ${color2},
      220px 50px 0 0 ${color2}, 225px 50px 0 0 ${color2}, 230px 50px 0 0 ${color2}, 235px 50px 0 0 ${color2},
      240px 50px 0 0 ${color2}, 245px 50px 0 0 ${color2}, 250px 50px 0 0 ${color2}, 255px 50px 0 0 ${color2},
      260px 50px 0 0 ${color2}, 265px 50px 0 0 ${color2}, 270px 50px 0 0 ${darkenColor(color2,20)}, 275px 50px 0 0 ${darkenColor(color2,20)},
      5px 55px 0 0 ${darkenColor(color2,20)}, 10px 55px 0 0 ${darkenColor(color2,20)}, 15px 55px 0 0 ${color2}, 20px 55px 0 0 ${color2},
      25px 55px 0 0 ${color2}, 30px 55px 0 0 ${color2}, 35px 55px 0 0 ${color2}, 40px 55px 0 0 ${darkenColor(color4,20)},
      45px 55px 0 0 ${darkenColor(color4,20)}, 50px 55px 0 0 ${darkenColor(color4,20)}, 55px 55px 0 0 ${darkenColor(color4,20)}, 60px 55px 0 0 ${darkenColor(color4,20)},
      65px 55px 0 0 ${darkenColor(color4,20)}, 70px 55px 0 0 ${darkenColor(color4,20)}, 75px 55px 0 0 ${darkenColor(color4,20)}, 80px 55px 0 0 ${darkenColor(color4,20)},
      85px 55px 0 0 ${darkenColor(color4,20)}, 90px 55px 0 0 ${darkenColor(color4,20)}, 95px 55px 0 0 ${darkenColor(color4,20)}, 100px 55px 0 0 ${darkenColor(color4,20)},
      105px 55px 0 0 ${darkenColor(color4,20)}, 110px 55px 0 0 ${darkenColor(color4,20)}, 115px 55px 0 0 ${darkenColor(color4,20)}, 120px 55px 0 0 ${darkenColor(color4,20)},
      125px 55px 0 0 ${darkenColor(color4,20)}, 130px 55px 0 0 ${darkenColor(color4,20)}, 135px 55px 0 0 ${darkenColor(color4,20)}, 140px 55px 0 0 ${darkenColor(color4,20)},
      145px 55px 0 0 ${darkenColor(color4,20)}, 150px 55px 0 0 ${darkenColor(color4,20)}, 155px 55px 0 0 ${darkenColor(color4,20)}, 160px 55px 0 0 ${darkenColor(color4,20)},
      165px 55px 0 0 ${darkenColor(color4,20)}, 170px 55px 0 0 ${darkenColor(color4,20)}, 175px 55px 0 0 ${darkenColor(color4,20)}, 180px 55px 0 0 ${darkenColor(color4,20)},
      185px 55px 0 0 ${darkenColor(color4,20)}, 190px 55px 0 0 ${darkenColor(color4,20)}, 195px 55px 0 0 ${darkenColor(color4,20)}, 200px 55px 0 0 ${darkenColor(color4,20)},
      205px 55px 0 0 ${darkenColor(color4,20)}, 210px 55px 0 0 ${darkenColor(color4,20)}, 215px 55px 0 0 ${darkenColor(color4,20)}, 220px 55px 0 0 ${darkenColor(color4,20)},
      225px 55px 0 0 ${darkenColor(color4,20)}, 230px 55px 0 0 ${darkenColor(color4,20)}, 235px 55px 0 0 ${darkenColor(color4,20)}, 240px 55px 0 0 ${darkenColor(color4,20)},
      245px 55px 0 0 ${color2}, 250px 55px 0 0 ${color2}, 255px 55px 0 0 ${color2}, 260px 55px 0 0 ${color2},
      265px 55px 0 0 ${color2}, 270px 55px 0 0 ${darkenColor(color2,20)}, 275px 55px 0 0 ${darkenColor(color2,20)}, 5px 60px 0 0 ${darkenColor(color2,20)},
      10px 60px 0 0 ${darkenColor(color2,20)}, 15px 60px 0 0 ${color2}, 20px 60px 0 0 ${color2}, 25px 60px 0 0 ${color2},
      30px 60px 0 0 ${color2}, 35px 60px 0 0 ${darkenColor(color4,20)}, 40px 60px 0 0 ${darkenColor(color4,20)}, 45px 60px 0 0 ${color4},
      50px 60px 0 0 ${color4}, 55px 60px 0 0 ${color4}, 60px 60px 0 0 ${color4}, 65px 60px 0 0 ${color4},
      70px 60px 0 0 ${color4}, 75px 60px 0 0 ${color4}, 80px 60px 0 0 ${color4}, 85px 60px 0 0 ${color4},
      90px 60px 0 0 ${color4}, 95px 60px 0 0 ${color4}, 100px 60px 0 0 ${color4}, 105px 60px 0 0 ${color4},
      110px 60px 0 0 ${color4}, 115px 60px 0 0 ${color4}, 120px 60px 0 0 ${color4}, 125px 60px 0 0 ${color4},
      130px 60px 0 0 ${color4}, 135px 60px 0 0 ${color4}, 140px 60px 0 0 ${color4}, 145px 60px 0 0 ${color4},
      150px 60px 0 0 ${color4}, 155px 60px 0 0 ${color4}, 160px 60px 0 0 ${color4}, 165px 60px 0 0 ${color4},
      170px 60px 0 0 ${color4}, 175px 60px 0 0 ${color4}, 180px 60px 0 0 ${color4}, 185px 60px 0 0 ${color4},
      190px 60px 0 0 ${color4}, 195px 60px 0 0 ${color4}, 200px 60px 0 0 ${color4}, 205px 60px 0 0 ${color4},
      210px 60px 0 0 ${color4}, 215px 60px 0 0 ${color4}, 220px 60px 0 0 ${color4}, 225px 60px 0 0 ${color4},
      230px 60px 0 0 ${color4}, 235px 60px 0 0 ${color4}, 240px 60px 0 0 ${color4}, 245px 60px 0 0 ${darkenColor(color4,20)},
      250px 60px 0 0 ${color2}, 255px 60px 0 0 ${color2}, 260px 60px 0 0 ${color2}, 265px 60px 0 0 ${color2},
      270px 60px 0 0 ${darkenColor(color2,20)}, 275px 60px 0 0 ${darkenColor(color2,20)}, 5px 65px 0 0 ${darkenColor(color2,20)}, 10px 65px 0 0 ${darkenColor(color2,20)},
      15px 65px 0 0 ${color2}, 20px 65px 0 0 ${color2}, 25px 65px 0 0 ${color2}, 30px 65px 0 0 ${color2},
      35px 65px 0 0 ${darkenColor(color4,20)}, 40px 65px 0 0 ${color4}, 45px 65px 0 0 ${color4}, 50px 65px 0 0 ${color4},
      55px 65px 0 0 ${darkenColor(color4,20)}, 60px 65px 0 0 ${darkenColor(color4,20)}, 65px 65px 0 0 ${darkenColor(color4,20)}, 70px 65px 0 0 ${darkenColor(color4,20)},
      75px 65px 0 0 ${darkenColor(color4,20)}, 80px 65px 0 0 ${darkenColor(color4,20)}, 85px 65px 0 0 ${darkenColor(color4,20)}, 90px 65px 0 0 ${darkenColor(color4,20)},
      95px 65px 0 0 ${darkenColor(color4,20)}, 100px 65px 0 0 ${darkenColor(color4,20)}, 105px 65px 0 0 ${darkenColor(color4,20)}, 110px 65px 0 0 ${darkenColor(color4,20)},
      115px 65px 0 0 ${darkenColor(color4,20)}, 120px 65px 0 0 ${darkenColor(color4,20)}, 125px 65px 0 0 ${darkenColor(color4,20)}, 130px 65px 0 0 ${darkenColor(color4,20)},
      135px 65px 0 0 ${darkenColor(color4,20)}, 140px 65px 0 0 ${darkenColor(color4,20)}, 145px 65px 0 0 ${darkenColor(color4,20)}, 150px 65px 0 0 ${darkenColor(color4,20)},
      155px 65px 0 0 ${darkenColor(color4,20)}, 160px 65px 0 0 ${darkenColor(color4,20)}, 165px 65px 0 0 ${darkenColor(color4,20)}, 170px 65px 0 0 ${darkenColor(color4,20)},
      175px 65px 0 0 ${darkenColor(color4,20)}, 180px 65px 0 0 ${darkenColor(color4,20)}, 185px 65px 0 0 ${darkenColor(color4,20)}, 190px 65px 0 0 ${darkenColor(color4,20)},
      195px 65px 0 0 ${darkenColor(color4,20)}, 200px 65px 0 0 ${darkenColor(color4,20)}, 205px 65px 0 0 ${darkenColor(color4,20)}, 210px 65px 0 0 ${darkenColor(color4,20)},
      215px 65px 0 0 ${darkenColor(color4,20)}, 220px 65px 0 0 ${darkenColor(color4,20)}, 225px 65px 0 0 ${darkenColor(color4,20)}, 230px 65px 0 0 ${color4},
      235px 65px 0 0 ${color4}, 240px 65px 0 0 ${color4}, 245px 65px 0 0 ${darkenColor(color4,20)}, 250px 65px 0 0 ${color2},
      255px 65px 0 0 ${color2}, 260px 65px 0 0 ${color2}, 265px 65px 0 0 ${color2}, 270px 65px 0 0 ${darkenColor(color2,20)},
      275px 65px 0 0 ${darkenColor(color2,20)}, 5px 70px 0 0 ${darkenColor(color2,20)}, 10px 70px 0 0 ${darkenColor(color2,20)}, 15px 70px 0 0 ${color2},
      20px 70px 0 0 ${color2}, 25px 70px 0 0 ${color2}, 30px 70px 0 0 ${color2}, 35px 70px 0 0 ${darkenColor(color4,20)},
      40px 70px 0 0 ${color4}, 45px 70px 0 0 ${color4}, 50px 70px 0 0 ${color4}, 55px 70px 0 0 ${color4},
      60px 70px 0 0 ${color4}, 65px 70px 0 0 ${color4}, 70px 70px 0 0 ${color4}, 75px 70px 0 0 ${color4},
      80px 70px 0 0 ${color4}, 85px 70px 0 0 ${color4}, 90px 70px 0 0 ${color4}, 95px 70px 0 0 ${color4},
      100px 70px 0 0 ${color4}, 105px 70px 0 0 ${color4}, 110px 70px 0 0 ${color4}, 115px 70px 0 0 ${color4},
      120px 70px 0 0 ${color4}, 125px 70px 0 0 ${color4}, 130px 70px 0 0 ${color4}, 135px 70px 0 0 ${color4},
      140px 70px 0 0 ${color4}, 145px 70px 0 0 ${color4}, 150px 70px 0 0 ${color4}, 155px 70px 0 0 ${color4},
      160px 70px 0 0 ${color4}, 165px 70px 0 0 ${color4}, 170px 70px 0 0 ${color4}, 175px 70px 0 0 ${color4},
      180px 70px 0 0 ${color4}, 185px 70px 0 0 ${color4}, 190px 70px 0 0 ${color4}, 195px 70px 0 0 ${color4},
      200px 70px 0 0 ${color4}, 205px 70px 0 0 ${color4}, 210px 70px 0 0 ${color4}, 215px 70px 0 0 ${color4},
      220px 70px 0 0 ${color4}, 225px 70px 0 0 ${color4}, 230px 70px 0 0 ${color4}, 235px 70px 0 0 ${color4},
      240px 70px 0 0 ${color4}, 245px 70px 0 0 ${darkenColor(color4,20)}, 250px 70px 0 0 ${color2}, 255px 70px 0 0 ${color2},
      260px 70px 0 0 ${color2}, 265px 70px 0 0 ${color2}, 270px 70px 0 0 ${darkenColor(color2,20)}, 275px 70px 0 0 ${darkenColor(color2,20)},
      5px 75px 0 0 ${darkenColor(color2,20)}, 10px 75px 0 0 ${darkenColor(color2,20)}, 15px 75px 0 0 ${color2}, 20px 75px 0 0 ${color2},
      25px 75px 0 0 ${color2}, 30px 75px 0 0 ${color2}, 35px 75px 0 0 ${darkenColor(color4,20)}, 40px 75px 0 0 ${color4},
      45px 75px 0 0 ${color4}, 50px 75px 0 0 ${color4}, 55px 75px 0 0 ${color4}, 60px 75px 0 0 ${color4},
      65px 75px 0 0 ${darkenColor(color3,20)}, 70px 75px 0 0 ${darkenColor(color3,20)}, 75px 75px 0 0 ${darkenColor(color3,20)}, 80px 75px 0 0 ${darkenColor(color3,20)},
      85px 75px 0 0 ${darkenColor(color3,20)}, 90px 75px 0 0 ${darkenColor(color3,20)}, 95px 75px 0 0 ${darkenColor(color3,20)}, 100px 75px 0 0 ${darkenColor(color3,20)},
      105px 75px 0 0 ${darkenColor(color3,20)}, 110px 75px 0 0 ${darkenColor(color3,20)}, 115px 75px 0 0 ${darkenColor(color3,20)}, 120px 75px 0 0 ${darkenColor(color3,20)},
      125px 75px 0 0 ${darkenColor(color3,20)}, 130px 75px 0 0 ${darkenColor(color3,20)}, 135px 75px 0 0 ${darkenColor(color3,20)}, 140px 75px 0 0 ${darkenColor(color3,20)},
      145px 75px 0 0 ${darkenColor(color3,20)}, 150px 75px 0 0 ${darkenColor(color3,20)}, 155px 75px 0 0 ${darkenColor(color3,20)}, 160px 75px 0 0 ${darkenColor(color3,20)},
      165px 75px 0 0 ${darkenColor(color3,20)}, 170px 75px 0 0 ${darkenColor(color3,20)}, 175px 75px 0 0 ${darkenColor(color3,20)}, 180px 75px 0 0 ${darkenColor(color3,20)},
      185px 75px 0 0 ${darkenColor(color3,20)}, 190px 75px 0 0 ${darkenColor(color3,20)}, 195px 75px 0 0 ${darkenColor(color3,20)}, 200px 75px 0 0 ${darkenColor(color3,20)},
      205px 75px 0 0 ${darkenColor(color3,20)}, 210px 75px 0 0 ${darkenColor(color3,20)}, 215px 75px 0 0 ${darkenColor(color3,20)}, 220px 75px 0 0 ${color4},
      225px 75px 0 0 ${color4}, 230px 75px 0 0 ${color4}, 235px 75px 0 0 ${color4}, 240px 75px 0 0 ${color4},
      245px 75px 0 0 ${darkenColor(color4,20)}, 250px 75px 0 0 ${color2}, 255px 75px 0 0 ${color2}, 260px 75px 0 0 ${color2},
      265px 75px 0 0 ${color2}, 270px 75px 0 0 ${darkenColor(color2,20)}, 275px 75px 0 0 ${darkenColor(color2,20)}, 5px 80px 0 0 ${darkenColor(color2,20)},
      10px 80px 0 0 ${darkenColor(color2,20)}, 15px 80px 0 0 ${color2}, 20px 80px 0 0 ${color2}, 25px 80px 0 0 ${color2},
      30px 80px 0 0 ${color2}, 35px 80px 0 0 ${darkenColor(color4,20)}, 40px 80px 0 0 ${color4}, 45px 80px 0 0 ${color4},
      50px 80px 0 0 ${color4}, 55px 80px 0 0 ${color4}, 60px 80px 0 0 ${darkenColor(color3,20)}, 65px 80px 0 0 ${darkenColor(color3,20)},
      70px 80px 0 0 ${color3}, 75px 80px 0 0 ${color3}, 80px 80px 0 0 ${color3}, 85px 80px 0 0 ${color3},
      90px 80px 0 0 ${color3}, 95px 80px 0 0 ${color3}, 100px 80px 0 0 ${color3}, 105px 80px 0 0 ${color3},
      110px 80px 0 0 ${color3}, 115px 80px 0 0 ${color3}, 120px 80px 0 0 ${color3}, 125px 80px 0 0 ${color3},
      130px 80px 0 0 ${color3}, 135px 80px 0 0 ${color3}, 140px 80px 0 0 ${color3}, 145px 80px 0 0 ${color3},
      150px 80px 0 0 ${color3}, 155px 80px 0 0 ${color3}, 160px 80px 0 0 ${color3}, 165px 80px 0 0 ${color3},
      170px 80px 0 0 ${color3}, 175px 80px 0 0 ${color3}, 180px 80px 0 0 ${color3}, 185px 80px 0 0 ${color3},
      190px 80px 0 0 ${color3}, 195px 80px 0 0 ${color3}, 200px 80px 0 0 ${color3}, 205px 80px 0 0 ${color3},
      210px 80px 0 0 ${color3}, 215px 80px 0 0 ${darkenColor(color3,20)}, 220px 80px 0 0 ${darkenColor(color3,20)}, 225px 80px 0 0 ${color4},
      230px 80px 0 0 ${color4}, 235px 80px 0 0 ${color4}, 240px 80px 0 0 ${color4}, 245px 80px 0 0 ${darkenColor(color4,20)},
      250px 80px 0 0 ${color2}, 255px 80px 0 0 ${color2}, 260px 80px 0 0 ${color2}, 265px 80px 0 0 ${color2},
      270px 80px 0 0 ${darkenColor(color2,20)}, 275px 80px 0 0 ${darkenColor(color2,20)}, 5px 85px 0 0 ${darkenColor(color2,20)}, 10px 85px 0 0 ${darkenColor(color2,20)},
      15px 85px 0 0 ${color2}, 20px 85px 0 0 ${color2}, 25px 85px 0 0 ${color2}, 30px 85px 0 0 ${color2},
      35px 85px 0 0 ${darkenColor(color4,20)}, 40px 85px 0 0 ${color4}, 45px 85px 0 0 ${color4}, 50px 85px 0 0 ${color4},
      55px 85px 0 0 ${color4}, 60px 85px 0 0 ${darkenColor(color3,20)}, 65px 85px 0 0 ${color3}, 70px 85px 0 0 ${color3},
      75px 85px 0 0 ${color3}, 80px 85px 0 0 ${darkenColor(color3,20)}, 85px 85px 0 0 ${darkenColor(color3,20)}, 90px 85px 0 0 ${darkenColor(color3,20)},
      95px 85px 0 0 ${color3}, 100px 85px 0 0 ${color3}, 105px 85px 0 0 ${color3}, 110px 85px 0 0 ${color3},
      115px 85px 0 0 ${darkenColor(color3,20)}, 120px 85px 0 0 ${darkenColor(color3,20)}, 125px 85px 0 0 ${darkenColor(color3,20)}, 130px 85px 0 0 ${darkenColor(color3,20)},
      135px 85px 0 0 ${darkenColor(color3,20)}, 140px 85px 0 0 ${darkenColor(color3,20)}, 145px 85px 0 0 ${darkenColor(color3,20)}, 150px 85px 0 0 ${darkenColor(color3,20)},
      155px 85px 0 0 ${darkenColor(color3,20)}, 160px 85px 0 0 ${darkenColor(color3,20)}, 165px 85px 0 0 ${darkenColor(color3,20)}, 170px 85px 0 0 ${color3},
      175px 85px 0 0 ${color3}, 180px 85px 0 0 ${color3}, 185px 85px 0 0 ${color3}, 190px 85px 0 0 ${darkenColor(color3,20)},
      195px 85px 0 0 ${darkenColor(color3,20)}, 200px 85px 0 0 ${darkenColor(color3,20)}, 205px 85px 0 0 ${color3}, 210px 85px 0 0 ${color3},
      215px 85px 0 0 ${color3}, 220px 85px 0 0 ${darkenColor(color3,20)}, 225px 85px 0 0 ${color4}, 230px 85px 0 0 ${color4},
      235px 85px 0 0 ${color4}, 240px 85px 0 0 ${color4}, 245px 85px 0 0 ${darkenColor(color4,20)}, 250px 85px 0 0 ${color2},
      255px 85px 0 0 ${color2}, 260px 85px 0 0 ${color2}, 265px 85px 0 0 ${color2}, 270px 85px 0 0 ${darkenColor(color2,20)},
      275px 85px 0 0 ${darkenColor(color2,20)}, 5px 90px 0 0 ${darkenColor(color2,20)}, 10px 90px 0 0 ${darkenColor(color2,20)}, 15px 90px 0 0 ${color2},
      20px 90px 0 0 ${color2}, 25px 90px 0 0 ${color2}, 30px 90px 0 0 ${color2}, 35px 90px 0 0 ${darkenColor(color4,20)},
      40px 90px 0 0 ${color4}, 45px 90px 0 0 ${color4}, 50px 90px 0 0 ${color4}, 55px 90px 0 0 ${color4},
      60px 90px 0 0 ${darkenColor(color3,20)}, 65px 90px 0 0 ${color3}, 70px 90px 0 0 ${color3}, 75px 90px 0 0 ${darkenColor(color3,20)},
      80px 90px 0 0 #eeeeeeff, 85px 90px 0 0 #eeeeeeff, 90px 90px 0 0 #eeeeeeff, 95px 90px 0 0 ${darkenColor(color3,20)},
      100px 90px 0 0 ${color3}, 105px 90px 0 0 ${color3}, 110px 90px 0 0 ${darkenColor(color3,20)}, 115px 90px 0 0 ${darkenColor(color3,20)},
      120px 90px 0 0 #eeeeeeff, 125px 90px 0 0 #eeeeeeff, 130px 90px 0 0 #eeeeeeff, 135px 90px 0 0 #eeeeeeff,
      140px 90px 0 0 #eeeeeeff, 145px 90px 0 0 #eeeeeeff, 150px 90px 0 0 #eeeeeeff, 155px 90px 0 0 #eeeeeeff,
      160px 90px 0 0 #eeeeeeff, 165px 90px 0 0 ${darkenColor(color3,20)}, 170px 90px 0 0 ${darkenColor(color3,20)}, 175px 90px 0 0 ${color3},
      180px 90px 0 0 ${color3}, 185px 90px 0 0 ${darkenColor(color3,20)}, 190px 90px 0 0 #eeeeeeff, 195px 90px 0 0 #eeeeeeff,
      200px 90px 0 0 #eeeeeeff, 205px 90px 0 0 ${darkenColor(color3,20)}, 210px 90px 0 0 ${color3}, 215px 90px 0 0 ${color3},
      220px 90px 0 0 ${darkenColor(color3,20)}, 225px 90px 0 0 ${color4}, 230px 90px 0 0 ${color4}, 235px 90px 0 0 ${color4},
      240px 90px 0 0 ${color4}, 245px 90px 0 0 ${darkenColor(color4,20)}, 250px 90px 0 0 ${color2}, 255px 90px 0 0 ${color2},
      260px 90px 0 0 ${color2}, 265px 90px 0 0 ${color2}, 270px 90px 0 0 ${darkenColor(color2,20)}, 275px 90px 0 0 ${darkenColor(color2,20)},
      5px 95px 0 0 ${darkenColor(color2,20)}, 10px 95px 0 0 ${darkenColor(color2,20)}, 15px 95px 0 0 ${color2}, 20px 95px 0 0 ${color2},
      25px 95px 0 0 ${color2}, 30px 95px 0 0 ${color2}, 35px 95px 0 0 ${darkenColor(color4,20)}, 40px 95px 0 0 ${color4},
      45px 95px 0 0 ${color4}, 50px 95px 0 0 ${color4}, 55px 95px 0 0 ${color4}, 60px 95px 0 0 ${darkenColor(color3,20)},
      65px 95px 0 0 ${color3}, 70px 95px 0 0 ${darkenColor(color3,20)}, 75px 95px 0 0 #eeeeeeff, 80px 95px 0 0 ${darkenColor(color3,20)},
      85px 95px 0 0 #eeeeeeff, 90px 95px 0 0 ${darkenColor(color3,20)}, 95px 95px 0 0 #eeeeeeff, 100px 95px 0 0 ${darkenColor(color3,20)},
      105px 95px 0 0 ${color3}, 110px 95px 0 0 ${darkenColor(color3,20)}, 115px 95px 0 0 #34363cff, 120px 95px 0 0 #eeeeeeff,
      125px 95px 0 0 #eeeeeeff, 130px 95px 0 0 #eeeeeeff, 135px 95px 0 0 #eeeeeeff, 140px 95px 0 0 #eeeeeeff,
      145px 95px 0 0 #464b59ff, 150px 95px 0 0 #464b59ff, 155px 95px 0 0 #eeeeeeff, 160px 95px 0 0 #eeeeeeff,
      165px 95px 0 0 #464b59ff, 170px 95px 0 0 ${darkenColor(color3,20)}, 175px 95px 0 0 ${color3}, 180px 95px 0 0 ${darkenColor(color3,20)},
      185px 95px 0 0 #eeeeeeff, 190px 95px 0 0 ${darkenColor(color3,20)}, 195px 95px 0 0 #eeeeeeff, 200px 95px 0 0 ${darkenColor(color3,20)},
      205px 95px 0 0 #eeeeeeff, 210px 95px 0 0 ${darkenColor(color3,20)}, 215px 95px 0 0 ${color3}, 220px 95px 0 0 ${darkenColor(color3,20)},
      225px 95px 0 0 ${color4}, 230px 95px 0 0 ${color4}, 235px 95px 0 0 ${color4}, 240px 95px 0 0 ${color4},
      245px 95px 0 0 ${darkenColor(color4,20)}, 250px 95px 0 0 ${color2}, 255px 95px 0 0 ${color2}, 260px 95px 0 0 ${color2},
      265px 95px 0 0 ${color2}, 270px 95px 0 0 ${darkenColor(color2,20)}, 275px 95px 0 0 ${darkenColor(color2,20)}, 5px 100px 0 0 ${darkenColor(color2,20)},
      10px 100px 0 0 ${darkenColor(color2,20)}, 15px 100px 0 0 ${color2}, 20px 100px 0 0 ${color2}, 25px 100px 0 0 ${color2},
      30px 100px 0 0 ${color2}, 35px 100px 0 0 ${darkenColor(color4,20)}, 40px 100px 0 0 ${color4}, 45px 100px 0 0 ${color4},
      50px 100px 0 0 ${color4}, 55px 100px 0 0 ${color4}, 60px 100px 0 0 ${darkenColor(color3,20)}, 65px 100px 0 0 ${color3},
      70px 100px 0 0 ${darkenColor(color3,20)}, 75px 100px 0 0 #eeeeeeff, 80px 100px 0 0 #eeeeeeff, 85px 100px 0 0 #eeeeeeff,
      90px 100px 0 0 #eeeeeeff, 95px 100px 0 0 #eeeeeeff, 100px 100px 0 0 ${darkenColor(color3,20)}, 105px 100px 0 0 ${color3},
      110px 100px 0 0 ${darkenColor(color3,20)}, 115px 100px 0 0 #34363cff, 120px 100px 0 0 #34363cff, 125px 100px 0 0 #eeeeeeff,
      130px 100px 0 0 #34363cff, 135px 100px 0 0 #34363cff, 140px 100px 0 0 #eeeeeeff, 145px 100px 0 0 #464b59ff,
      150px 100px 0 0 #464b59ff, 155px 100px 0 0 #eeeeeeff, 160px 100px 0 0 #34363cff, 165px 100px 0 0 #464b59ff,
      170px 100px 0 0 ${darkenColor(color3,20)}, 175px 100px 0 0 ${color3}, 180px 100px 0 0 ${darkenColor(color3,20)}, 185px 100px 0 0 #eeeeeeff,
      190px 100px 0 0 #eeeeeeff, 195px 100px 0 0 #eeeeeeff, 200px 100px 0 0 #eeeeeeff, 205px 100px 0 0 #eeeeeeff,
      210px 100px 0 0 ${darkenColor(color3,20)}, 215px 100px 0 0 ${color3}, 220px 100px 0 0 ${darkenColor(color3,20)}, 225px 100px 0 0 ${color4},
      230px 100px 0 0 ${color4}, 235px 100px 0 0 ${color4}, 240px 100px 0 0 ${color4}, 245px 100px 0 0 ${darkenColor(color4,20)},
      250px 100px 0 0 ${color2}, 255px 100px 0 0 ${color2}, 260px 100px 0 0 ${color2}, 265px 100px 0 0 ${color2},
      270px 100px 0 0 ${darkenColor(color2,20)}, 275px 100px 0 0 ${darkenColor(color2,20)}, 5px 105px 0 0 ${darkenColor(color2,20)}, 10px 105px 0 0 ${darkenColor(color2,20)},
      15px 105px 0 0 ${color2}, 20px 105px 0 0 ${color2}, 25px 105px 0 0 ${color2}, 30px 105px 0 0 ${color2},
      35px 105px 0 0 ${darkenColor(color4,20)}, 40px 105px 0 0 ${color4}, 45px 105px 0 0 ${color4}, 50px 105px 0 0 ${color4},
      55px 105px 0 0 ${color4}, 60px 105px 0 0 ${darkenColor(color3,20)}, 65px 105px 0 0 ${color3}, 70px 105px 0 0 ${darkenColor(color3,20)},
      75px 105px 0 0 #eeeeeeff, 80px 105px 0 0 ${darkenColor(color3,20)}, 85px 105px 0 0 #eeeeeeff, 90px 105px 0 0 ${darkenColor(color3,20)},
      95px 105px 0 0 #eeeeeeff, 100px 105px 0 0 ${darkenColor(color3,20)}, 105px 105px 0 0 ${color3}, 110px 105px 0 0 ${darkenColor(color3,20)},
      115px 105px 0 0 #34363cff, 120px 105px 0 0 #34363cff, 125px 105px 0 0 #7e7e80ff, 130px 105px 0 0 #34363cff,
      135px 105px 0 0 #34363cff, 140px 105px 0 0 #7e7e80ff, 145px 105px 0 0 #464b59ff, 150px 105px 0 0 #464b59ff,
      155px 105px 0 0 #34363cff, 160px 105px 0 0 #34363cff, 165px 105px 0 0 #464b59ff, 170px 105px 0 0 ${darkenColor(color3,20)},
      175px 105px 0 0 ${color3}, 180px 105px 0 0 ${darkenColor(color3,20)}, 185px 105px 0 0 #eeeeeeff, 190px 105px 0 0 ${darkenColor(color3,20)},
      195px 105px 0 0 #eeeeeeff, 200px 105px 0 0 ${darkenColor(color3,20)}, 205px 105px 0 0 #eeeeeeff, 210px 105px 0 0 ${darkenColor(color3,20)},
      215px 105px 0 0 ${color3}, 220px 105px 0 0 ${darkenColor(color3,20)}, 225px 105px 0 0 ${color4}, 230px 105px 0 0 ${color4},
      235px 105px 0 0 ${color4}, 240px 105px 0 0 ${color4}, 245px 105px 0 0 ${darkenColor(color4,20)}, 250px 105px 0 0 ${color2},
      255px 105px 0 0 ${color2}, 260px 105px 0 0 ${color2}, 265px 105px 0 0 ${color2}, 270px 105px 0 0 ${darkenColor(color2,20)},
      275px 105px 0 0 ${darkenColor(color2,20)}, 5px 110px 0 0 ${darkenColor(color2,20)}, 10px 110px 0 0 ${darkenColor(color2,20)}, 15px 110px 0 0 ${color2},
      20px 110px 0 0 ${color2}, 25px 110px 0 0 ${color2}, 30px 110px 0 0 ${color2}, 35px 110px 0 0 ${darkenColor(color4,20)},
      40px 110px 0 0 ${color4}, 45px 110px 0 0 ${color4}, 50px 110px 0 0 ${color4}, 55px 110px 0 0 ${color4},
      60px 110px 0 0 ${darkenColor(color3,20)}, 65px 110px 0 0 ${color3}, 70px 110px 0 0 ${color3}, 75px 110px 0 0 ${darkenColor(color3,20)},
      80px 110px 0 0 #eeeeeeff, 85px 110px 0 0 #eeeeeeff, 90px 110px 0 0 #eeeeeeff, 95px 110px 0 0 ${darkenColor(color3,20)},
      100px 110px 0 0 ${color3}, 105px 110px 0 0 ${color3}, 110px 110px 0 0 ${darkenColor(color3,20)}, 115px 110px 0 0 ${darkenColor(color3,20)},
      120px 110px 0 0 #34363cff, 125px 110px 0 0 #7e7e80ff, 130px 110px 0 0 #34363cff, 135px 110px 0 0 #34363cff,
      140px 110px 0 0 #7e7e80ff, 145px 110px 0 0 #464b59ff, 150px 110px 0 0 #464b59ff, 155px 110px 0 0 #34363cff,
      160px 110px 0 0 #34363cff, 165px 110px 0 0 ${darkenColor(color3,20)}, 170px 110px 0 0 ${darkenColor(color3,20)}, 175px 110px 0 0 ${color3},
      180px 110px 0 0 ${color3}, 185px 110px 0 0 ${darkenColor(color3,20)}, 190px 110px 0 0 #eeeeeeff, 195px 110px 0 0 #eeeeeeff,
      200px 110px 0 0 #eeeeeeff, 205px 110px 0 0 ${darkenColor(color3,20)}, 210px 110px 0 0 ${color3}, 215px 110px 0 0 ${color3},
      220px 110px 0 0 ${darkenColor(color3,20)}, 225px 110px 0 0 ${color4}, 230px 110px 0 0 ${color4}, 235px 110px 0 0 ${color4},
      240px 110px 0 0 ${color4}, 245px 110px 0 0 ${darkenColor(color4,20)}, 250px 110px 0 0 ${color2}, 255px 110px 0 0 ${color2},
      260px 110px 0 0 ${color2}, 265px 110px 0 0 ${color2}, 270px 110px 0 0 ${darkenColor(color2,20)}, 275px 110px 0 0 ${darkenColor(color2,20)},
      5px 115px 0 0 ${darkenColor(color2,20)}, 10px 115px 0 0 ${darkenColor(color2,20)}, 15px 115px 0 0 ${color2}, 20px 115px 0 0 ${color2},
      25px 115px 0 0 ${color2}, 30px 115px 0 0 ${color2}, 35px 115px 0 0 ${darkenColor(color4,20)}, 40px 115px 0 0 ${color4},
      45px 115px 0 0 ${color4}, 50px 115px 0 0 ${color4}, 55px 115px 0 0 ${color4}, 60px 115px 0 0 ${darkenColor(color3,20)},
      65px 115px 0 0 ${color3}, 70px 115px 0 0 ${color3}, 75px 115px 0 0 ${color3}, 80px 115px 0 0 ${darkenColor(color3,20)},
      85px 115px 0 0 ${darkenColor(color3,20)}, 90px 115px 0 0 ${darkenColor(color3,20)}, 95px 115px 0 0 ${color3}, 100px 115px 0 0 ${color3},
      105px 115px 0 0 ${color3}, 110px 115px 0 0 ${color3}, 115px 115px 0 0 ${darkenColor(color3,20)}, 120px 115px 0 0 ${darkenColor(color3,20)},
      125px 115px 0 0 ${darkenColor(color3,20)}, 130px 115px 0 0 ${darkenColor(color3,20)}, 135px 115px 0 0 ${darkenColor(color3,20)}, 140px 115px 0 0 ${darkenColor(color3,20)},
      145px 115px 0 0 ${darkenColor(color3,20)}, 150px 115px 0 0 ${darkenColor(color3,20)}, 155px 115px 0 0 ${darkenColor(color3,20)}, 160px 115px 0 0 ${darkenColor(color3,20)},
      165px 115px 0 0 ${darkenColor(color3,20)}, 170px 115px 0 0 ${color3}, 175px 115px 0 0 ${color3}, 180px 115px 0 0 ${color3},
      185px 115px 0 0 ${color3}, 190px 115px 0 0 ${darkenColor(color3,20)}, 195px 115px 0 0 ${darkenColor(color3,20)}, 200px 115px 0 0 ${darkenColor(color3,20)},
      205px 115px 0 0 ${color3}, 210px 115px 0 0 ${color3}, 215px 115px 0 0 ${color3}, 220px 115px 0 0 ${darkenColor(color3,20)},
      225px 115px 0 0 ${color4}, 230px 115px 0 0 ${color4}, 235px 115px 0 0 ${color4}, 240px 115px 0 0 ${color4},
      245px 115px 0 0 ${darkenColor(color4,20)}, 250px 115px 0 0 ${color2}, 255px 115px 0 0 ${color2}, 260px 115px 0 0 ${color2},
      265px 115px 0 0 ${color2}, 270px 115px 0 0 ${darkenColor(color2,20)}, 275px 115px 0 0 ${darkenColor(color2,20)}, 5px 120px 0 0 ${darkenColor(color2,20)},
      10px 120px 0 0 ${darkenColor(color2,20)}, 15px 120px 0 0 ${color2}, 20px 120px 0 0 ${color2}, 25px 120px 0 0 ${color2},
      30px 120px 0 0 ${color2}, 35px 120px 0 0 ${darkenColor(color4,20)}, 40px 120px 0 0 ${color4}, 45px 120px 0 0 ${color4},
      50px 120px 0 0 ${color4}, 55px 120px 0 0 ${color4}, 60px 120px 0 0 ${darkenColor(color3,20)}, 65px 120px 0 0 ${darkenColor(color3,20)},
      70px 120px 0 0 ${color3}, 75px 120px 0 0 ${color3}, 80px 120px 0 0 ${color3}, 85px 120px 0 0 ${color3},
      90px 120px 0 0 ${color3}, 95px 120px 0 0 ${color3}, 100px 120px 0 0 ${color3}, 105px 120px 0 0 ${color3},
      110px 120px 0 0 ${color3}, 115px 120px 0 0 ${color3}, 120px 120px 0 0 ${color3}, 125px 120px 0 0 ${color3},
      130px 120px 0 0 ${color3}, 135px 120px 0 0 ${color3}, 140px 120px 0 0 ${color3}, 145px 120px 0 0 ${color3},
      150px 120px 0 0 ${color3}, 155px 120px 0 0 ${color3}, 160px 120px 0 0 ${color3}, 165px 120px 0 0 ${color3},
      170px 120px 0 0 ${color3}, 175px 120px 0 0 ${color3}, 180px 120px 0 0 ${color3}, 185px 120px 0 0 ${color3},
      190px 120px 0 0 ${color3}, 195px 120px 0 0 ${color3}, 200px 120px 0 0 ${color3}, 205px 120px 0 0 ${color3},
      210px 120px 0 0 ${color3}, 215px 120px 0 0 ${darkenColor(color3,20)}, 220px 120px 0 0 ${darkenColor(color3,20)}, 225px 120px 0 0 ${color4},
      230px 120px 0 0 ${color4}, 235px 120px 0 0 ${color4}, 240px 120px 0 0 ${color4}, 245px 120px 0 0 ${darkenColor(color4,20)},
      250px 120px 0 0 ${color2}, 255px 120px 0 0 ${color2}, 260px 120px 0 0 ${color2}, 265px 120px 0 0 ${color2},
      270px 120px 0 0 ${darkenColor(color2,20)}, 275px 120px 0 0 ${darkenColor(color2,20)}, 5px 125px 0 0 ${darkenColor(color2,20)}, 10px 125px 0 0 ${darkenColor(color2,20)},
      15px 125px 0 0 ${color2}, 20px 125px 0 0 ${color2}, 25px 125px 0 0 ${color2}, 30px 125px 0 0 ${color2},
      35px 125px 0 0 ${darkenColor(color4,20)}, 40px 125px 0 0 ${color4}, 45px 125px 0 0 ${color4}, 50px 125px 0 0 ${color4},
      55px 125px 0 0 ${color4}, 60px 125px 0 0 ${color4}, 65px 125px 0 0 ${darkenColor(color3,20)}, 70px 125px 0 0 ${darkenColor(color3,20)},
      75px 125px 0 0 ${darkenColor(color3,20)}, 80px 125px 0 0 ${darkenColor(color3,20)}, 85px 125px 0 0 ${darkenColor(color3,20)}, 90px 125px 0 0 ${darkenColor(color3,20)},
      95px 125px 0 0 ${darkenColor(color3,20)}, 100px 125px 0 0 ${darkenColor(color3,20)}, 105px 125px 0 0 ${darkenColor(color3,20)}, 110px 125px 0 0 ${darkenColor(color3,20)},
      115px 125px 0 0 ${darkenColor(color3,20)}, 120px 125px 0 0 ${darkenColor(color3,20)}, 125px 125px 0 0 ${darkenColor(color3,20)}, 130px 125px 0 0 ${darkenColor(color3,20)},
      135px 125px 0 0 ${darkenColor(color3,20)}, 140px 125px 0 0 ${darkenColor(color3,20)}, 145px 125px 0 0 ${darkenColor(color3,20)}, 150px 125px 0 0 ${darkenColor(color3,20)},
      155px 125px 0 0 ${darkenColor(color3,20)}, 160px 125px 0 0 ${darkenColor(color3,20)}, 165px 125px 0 0 ${darkenColor(color3,20)}, 170px 125px 0 0 ${darkenColor(color3,20)},
      175px 125px 0 0 ${darkenColor(color3,20)}, 180px 125px 0 0 ${darkenColor(color3,20)}, 185px 125px 0 0 ${darkenColor(color3,20)}, 190px 125px 0 0 ${darkenColor(color3,20)},
      195px 125px 0 0 ${darkenColor(color3,20)}, 200px 125px 0 0 ${darkenColor(color3,20)}, 205px 125px 0 0 ${darkenColor(color3,20)}, 210px 125px 0 0 ${darkenColor(color3,20)},
      215px 125px 0 0 ${darkenColor(color3,20)}, 220px 125px 0 0 ${color4}, 225px 125px 0 0 ${color4}, 230px 125px 0 0 ${color4},
      235px 125px 0 0 ${color4}, 240px 125px 0 0 ${color4}, 245px 125px 0 0 ${darkenColor(color4,20)}, 250px 125px 0 0 ${color2},
      255px 125px 0 0 ${color2}, 260px 125px 0 0 ${color2}, 265px 125px 0 0 ${color2}, 270px 125px 0 0 ${darkenColor(color2,20)},
      275px 125px 0 0 ${darkenColor(color2,20)}, 5px 130px 0 0 ${darkenColor(color2,20)}, 10px 130px 0 0 ${darkenColor(color2,20)}, 15px 130px 0 0 ${color2},
      20px 130px 0 0 ${color2}, 25px 130px 0 0 ${color2}, 30px 130px 0 0 ${color2}, 35px 130px 0 0 ${darkenColor(color4,20)},
      40px 130px 0 0 ${color4}, 45px 130px 0 0 ${color4}, 50px 130px 0 0 ${color4}, 55px 130px 0 0 ${color4},
      60px 130px 0 0 ${color4}, 65px 130px 0 0 ${color4}, 70px 130px 0 0 ${color4}, 75px 130px 0 0 ${color4},
      80px 130px 0 0 ${color4}, 85px 130px 0 0 ${color4}, 90px 130px 0 0 ${color4}, 95px 130px 0 0 ${color4},
      100px 130px 0 0 ${color4}, 105px 130px 0 0 ${color4}, 110px 130px 0 0 ${color4}, 115px 130px 0 0 ${color4},
      120px 130px 0 0 ${color4}, 125px 130px 0 0 ${color4}, 130px 130px 0 0 ${color4}, 135px 130px 0 0 ${color4},
      140px 130px 0 0 ${color4}, 145px 130px 0 0 ${color4}, 150px 130px 0 0 ${color4}, 155px 130px 0 0 ${color4},
      160px 130px 0 0 ${color4}, 165px 130px 0 0 ${color4}, 170px 130px 0 0 ${color4}, 175px 130px 0 0 ${color4},
      180px 130px 0 0 ${color4}, 185px 130px 0 0 ${color4}, 190px 130px 0 0 ${color4}, 195px 130px 0 0 ${color4},
      200px 130px 0 0 ${color4}, 205px 130px 0 0 ${color4}, 210px 130px 0 0 ${color4}, 215px 130px 0 0 ${color4},
      220px 130px 0 0 ${color4}, 225px 130px 0 0 ${color4}, 230px 130px 0 0 ${color4}, 235px 130px 0 0 ${color4},
      240px 130px 0 0 ${color4}, 245px 130px 0 0 ${darkenColor(color4,20)}, 250px 130px 0 0 ${color2}, 255px 130px 0 0 ${color2},
      260px 130px 0 0 ${color2}, 265px 130px 0 0 ${color2}, 270px 130px 0 0 ${darkenColor(color2,20)}, 275px 130px 0 0 ${darkenColor(color2,20)},
      5px 135px 0 0 ${darkenColor(color2,20)}, 10px 135px 0 0 ${darkenColor(color2,20)}, 15px 135px 0 0 ${color2}, 20px 135px 0 0 ${color2},
      25px 135px 0 0 ${color2}, 30px 135px 0 0 ${color2}, 35px 135px 0 0 ${darkenColor(color4,20)}, 40px 135px 0 0 ${color4},
      45px 135px 0 0 ${color4}, 50px 135px 0 0 ${color4}, 55px 135px 0 0 ${darkenColor(color4,20)}, 60px 135px 0 0 ${darkenColor(color4,20)},
      65px 135px 0 0 ${darkenColor(color4,20)}, 70px 135px 0 0 ${darkenColor(color4,20)}, 75px 135px 0 0 ${darkenColor(color4,20)}, 80px 135px 0 0 ${darkenColor(color4,20)},
      85px 135px 0 0 ${darkenColor(color4,20)}, 90px 135px 0 0 ${darkenColor(color4,20)}, 95px 135px 0 0 ${darkenColor(color4,20)}, 100px 135px 0 0 ${darkenColor(color4,20)},
      105px 135px 0 0 ${darkenColor(color4,20)}, 110px 135px 0 0 ${darkenColor(color4,20)}, 115px 135px 0 0 ${darkenColor(color4,20)}, 120px 135px 0 0 ${darkenColor(color4,20)},
      125px 135px 0 0 ${darkenColor(color4,20)}, 130px 135px 0 0 ${darkenColor(color4,20)}, 135px 135px 0 0 ${darkenColor(color4,20)}, 140px 135px 0 0 ${darkenColor(color4,20)},
      145px 135px 0 0 ${darkenColor(color4,20)}, 150px 135px 0 0 ${darkenColor(color4,20)}, 155px 135px 0 0 ${darkenColor(color4,20)}, 160px 135px 0 0 ${darkenColor(color4,20)},
      165px 135px 0 0 ${darkenColor(color4,20)}, 170px 135px 0 0 ${darkenColor(color4,20)}, 175px 135px 0 0 ${darkenColor(color4,20)}, 180px 135px 0 0 ${darkenColor(color4,20)},
      185px 135px 0 0 ${darkenColor(color4,20)}, 190px 135px 0 0 ${darkenColor(color4,20)}, 195px 135px 0 0 ${darkenColor(color4,20)}, 200px 135px 0 0 ${darkenColor(color4,20)},
      205px 135px 0 0 ${darkenColor(color4,20)}, 210px 135px 0 0 ${darkenColor(color4,20)}, 215px 135px 0 0 ${darkenColor(color4,20)}, 220px 135px 0 0 ${darkenColor(color4,20)},
      225px 135px 0 0 ${darkenColor(color4,20)}, 230px 135px 0 0 ${color4}, 235px 135px 0 0 ${color4}, 240px 135px 0 0 ${color4},
      245px 135px 0 0 ${darkenColor(color4,20)}, 250px 135px 0 0 ${color2}, 255px 135px 0 0 ${color2}, 260px 135px 0 0 ${color2},
      265px 135px 0 0 ${color2}, 270px 135px 0 0 ${darkenColor(color2,20)}, 275px 135px 0 0 ${darkenColor(color2,20)}, 5px 140px 0 0 ${darkenColor(color2,20)},
      10px 140px 0 0 ${darkenColor(color2,20)}, 15px 140px 0 0 ${color2}, 20px 140px 0 0 ${color2}, 25px 140px 0 0 ${color2},
      30px 140px 0 0 ${color2}, 35px 140px 0 0 ${darkenColor(color4,20)}, 40px 140px 0 0 ${color4}, 45px 140px 0 0 ${color4},
      50px 140px 0 0 ${color4}, 55px 140px 0 0 ${color4}, 60px 140px 0 0 ${color4}, 65px 140px 0 0 ${color4},
      70px 140px 0 0 ${color4}, 75px 140px 0 0 ${color4}, 80px 140px 0 0 ${color4}, 85px 140px 0 0 ${color4},
      90px 140px 0 0 ${color4}, 95px 140px 0 0 ${color4}, 100px 140px 0 0 ${color4}, 105px 140px 0 0 ${color4},
      110px 140px 0 0 ${color4}, 115px 140px 0 0 ${color4}, 120px 140px 0 0 ${color4}, 125px 140px 0 0 ${color4},
      130px 140px 0 0 ${color4}, 135px 140px 0 0 ${color4}, 140px 140px 0 0 ${color4}, 145px 140px 0 0 ${color4},
      150px 140px 0 0 ${color4}, 155px 140px 0 0 ${color4}, 160px 140px 0 0 ${color4}, 165px 140px 0 0 ${color4},
      170px 140px 0 0 ${color4}, 175px 140px 0 0 ${color4}, 180px 140px 0 0 ${color4}, 185px 140px 0 0 ${color4},
      190px 140px 0 0 ${color4}, 195px 140px 0 0 ${color4}, 200px 140px 0 0 ${color4}, 205px 140px 0 0 ${color4},
      210px 140px 0 0 ${color4}, 215px 140px 0 0 ${color4}, 220px 140px 0 0 ${color4}, 225px 140px 0 0 ${color4},
      230px 140px 0 0 ${color4}, 235px 140px 0 0 ${color4}, 240px 140px 0 0 ${color4}, 245px 140px 0 0 ${darkenColor(color4,20)},
      250px 140px 0 0 ${color2}, 255px 140px 0 0 ${color2}, 260px 140px 0 0 ${color2}, 265px 140px 0 0 ${color2},
      270px 140px 0 0 ${darkenColor(color2,20)}, 275px 140px 0 0 ${darkenColor(color2,20)}, 5px 145px 0 0 ${darkenColor(color2,20)}, 10px 145px 0 0 ${darkenColor(color2,20)},
      15px 145px 0 0 ${color2}, 20px 145px 0 0 ${color2}, 25px 145px 0 0 ${color2}, 30px 145px 0 0 ${color2},
      35px 145px 0 0 ${darkenColor(color4,20)}, 40px 145px 0 0 ${color4}, 45px 145px 0 0 ${color4}, 50px 145px 0 0 ${color4},
      55px 145px 0 0 ${darkenColor(color4,20)}, 60px 145px 0 0 ${darkenColor(color4,20)}, 65px 145px 0 0 ${darkenColor(color4,20)}, 70px 145px 0 0 ${darkenColor(color4,20)},
      75px 145px 0 0 ${darkenColor(color4,20)}, 80px 145px 0 0 ${darkenColor(color4,20)}, 85px 145px 0 0 ${darkenColor(color4,20)}, 90px 145px 0 0 ${darkenColor(color4,20)},
      95px 145px 0 0 ${darkenColor(color4,20)}, 100px 145px 0 0 ${darkenColor(color4,20)}, 105px 145px 0 0 ${darkenColor(color4,20)}, 110px 145px 0 0 ${darkenColor(color4,20)},
      115px 145px 0 0 ${darkenColor(color4,20)}, 120px 145px 0 0 ${darkenColor(color4,20)}, 125px 145px 0 0 ${darkenColor(color4,20)}, 130px 145px 0 0 ${darkenColor(color4,20)},
      135px 145px 0 0 ${darkenColor(color4,20)}, 140px 145px 0 0 ${darkenColor(color4,20)}, 145px 145px 0 0 ${darkenColor(color4,20)}, 150px 145px 0 0 ${darkenColor(color4,20)},
      155px 145px 0 0 ${darkenColor(color4,20)}, 160px 145px 0 0 ${darkenColor(color4,20)}, 165px 145px 0 0 ${darkenColor(color4,20)}, 170px 145px 0 0 ${darkenColor(color4,20)},
      175px 145px 0 0 ${darkenColor(color4,20)}, 180px 145px 0 0 ${darkenColor(color4,20)}, 185px 145px 0 0 ${darkenColor(color4,20)}, 190px 145px 0 0 ${darkenColor(color4,20)},
      195px 145px 0 0 ${darkenColor(color4,20)}, 200px 145px 0 0 ${darkenColor(color4,20)}, 205px 145px 0 0 ${darkenColor(color4,20)}, 210px 145px 0 0 ${darkenColor(color4,20)},
      215px 145px 0 0 ${darkenColor(color4,20)}, 220px 145px 0 0 ${darkenColor(color4,20)}, 225px 145px 0 0 ${darkenColor(color4,20)}, 230px 145px 0 0 ${color4},
      235px 145px 0 0 ${color4}, 240px 145px 0 0 ${color4}, 245px 145px 0 0 ${darkenColor(color4,20)}, 250px 145px 0 0 ${color2},
      255px 145px 0 0 ${color2}, 260px 145px 0 0 ${color2}, 265px 145px 0 0 ${color2}, 270px 145px 0 0 ${darkenColor(color2,20)},
      275px 145px 0 0 ${darkenColor(color2,20)}, 5px 150px 0 0 ${darkenColor(color2,20)}, 10px 150px 0 0 ${darkenColor(color2,20)}, 15px 150px 0 0 ${color2},
      20px 150px 0 0 ${color2}, 25px 150px 0 0 ${color2}, 30px 150px 0 0 ${color2}, 35px 150px 0 0 ${darkenColor(color4,20)},
      40px 150px 0 0 ${darkenColor(color4,20)}, 45px 150px 0 0 ${color4}, 50px 150px 0 0 ${color4}, 55px 150px 0 0 ${color4},
      60px 150px 0 0 ${color4}, 65px 150px 0 0 ${color4}, 70px 150px 0 0 ${color4}, 75px 150px 0 0 ${color4},
      80px 150px 0 0 ${color4}, 85px 150px 0 0 ${color4}, 90px 150px 0 0 ${color4}, 95px 150px 0 0 ${color4},
      100px 150px 0 0 ${color4}, 105px 150px 0 0 ${color4}, 110px 150px 0 0 ${color4}, 115px 150px 0 0 ${color4},
      120px 150px 0 0 ${color4}, 125px 150px 0 0 ${color4}, 130px 150px 0 0 ${color4}, 135px 150px 0 0 ${color4},
      140px 150px 0 0 ${color4}, 145px 150px 0 0 ${color4}, 150px 150px 0 0 ${color4}, 155px 150px 0 0 ${color4},
      160px 150px 0 0 ${color4}, 165px 150px 0 0 ${color4}, 170px 150px 0 0 ${color4}, 175px 150px 0 0 ${color4},
      180px 150px 0 0 ${color4}, 185px 150px 0 0 ${color4}, 190px 150px 0 0 ${color4}, 195px 150px 0 0 ${color4},
      200px 150px 0 0 ${color4}, 205px 150px 0 0 ${color4}, 210px 150px 0 0 ${color4}, 215px 150px 0 0 ${color4},
      220px 150px 0 0 ${color4}, 225px 150px 0 0 ${color4}, 230px 150px 0 0 ${color4}, 235px 150px 0 0 ${color4},
      240px 150px 0 0 ${darkenColor(color4,20)}, 245px 150px 0 0 ${darkenColor(color4,20)}, 250px 150px 0 0 ${color2}, 255px 150px 0 0 ${color2},
      260px 150px 0 0 ${color2}, 265px 150px 0 0 ${color2}, 270px 150px 0 0 ${darkenColor(color2,20)}, 275px 150px 0 0 ${darkenColor(color2,20)},
      5px 155px 0 0 ${darkenColor(color2,20)}, 10px 155px 0 0 ${darkenColor(color2,20)}, 15px 155px 0 0 ${color2}, 20px 155px 0 0 ${color1},
      25px 155px 0 0 ${color2}, 30px 155px 0 0 ${color2}, 35px 155px 0 0 ${color2}, 40px 155px 0 0 ${darkenColor(color4,20)},
      45px 155px 0 0 ${darkenColor(color4,20)}, 50px 155px 0 0 ${darkenColor(color4,20)}, 55px 155px 0 0 ${darkenColor(color4,20)}, 60px 155px 0 0 ${darkenColor(color4,20)},
      65px 155px 0 0 ${darkenColor(color4,20)}, 70px 155px 0 0 ${darkenColor(color4,20)}, 75px 155px 0 0 ${darkenColor(color4,20)}, 80px 155px 0 0 ${darkenColor(color4,20)},
      85px 155px 0 0 ${darkenColor(color4,20)}, 90px 155px 0 0 ${darkenColor(color4,20)}, 95px 155px 0 0 ${darkenColor(color4,20)}, 100px 155px 0 0 ${darkenColor(color4,20)},
      105px 155px 0 0 ${darkenColor(color4,20)}, 110px 155px 0 0 ${darkenColor(color4,20)}, 115px 155px 0 0 ${darkenColor(color4,20)}, 120px 155px 0 0 ${darkenColor(color4,20)},
      125px 155px 0 0 ${darkenColor(color4,20)}, 130px 155px 0 0 ${darkenColor(color4,20)}, 135px 155px 0 0 ${darkenColor(color4,20)}, 140px 155px 0 0 ${darkenColor(color4,20)},
      145px 155px 0 0 ${darkenColor(color4,20)}, 150px 155px 0 0 ${darkenColor(color4,20)}, 155px 155px 0 0 ${darkenColor(color4,20)}, 160px 155px 0 0 ${darkenColor(color4,20)},
      165px 155px 0 0 ${darkenColor(color4,20)}, 170px 155px 0 0 ${darkenColor(color4,20)}, 175px 155px 0 0 ${darkenColor(color4,20)}, 180px 155px 0 0 ${darkenColor(color4,20)},
      185px 155px 0 0 ${darkenColor(color4,20)}, 190px 155px 0 0 ${darkenColor(color4,20)}, 195px 155px 0 0 ${darkenColor(color4,20)}, 200px 155px 0 0 ${darkenColor(color4,20)},
      205px 155px 0 0 ${darkenColor(color4,20)}, 210px 155px 0 0 ${darkenColor(color4,20)}, 215px 155px 0 0 ${darkenColor(color4,20)}, 220px 155px 0 0 ${darkenColor(color4,20)},
      225px 155px 0 0 ${darkenColor(color4,20)}, 230px 155px 0 0 ${darkenColor(color4,20)}, 235px 155px 0 0 ${darkenColor(color4,20)}, 240px 155px 0 0 ${darkenColor(color4,20)},
      245px 155px 0 0 ${color2}, 250px 155px 0 0 ${color2}, 255px 155px 0 0 ${color2}, 260px 155px 0 0 ${color1},
      265px 155px 0 0 ${color2}, 270px 155px 0 0 ${darkenColor(color2,20)}, 275px 155px 0 0 ${darkenColor(color2,20)}, 5px 160px 0 0 ${darkenColor(color2,20)},
      10px 160px 0 0 ${darkenColor(color2,20)}, 15px 160px 0 0 ${color1}, 20px 160px 0 0 ${color1}, 25px 160px 0 0 ${color1},
      30px 160px 0 0 ${color2}, 35px 160px 0 0 ${color2}, 40px 160px 0 0 ${color2}, 45px 160px 0 0 ${color2},
      50px 160px 0 0 ${color2}, 55px 160px 0 0 ${color2}, 60px 160px 0 0 ${color2}, 65px 160px 0 0 ${color2},
      70px 160px 0 0 ${color2}, 75px 160px 0 0 ${color2}, 80px 160px 0 0 ${color2}, 85px 160px 0 0 ${color2},
      90px 160px 0 0 ${color2}, 95px 160px 0 0 ${color2}, 100px 160px 0 0 ${color2}, 105px 160px 0 0 ${color2},
      110px 160px 0 0 ${color2}, 115px 160px 0 0 ${color2}, 120px 160px 0 0 ${color2}, 125px 160px 0 0 ${color2},
      130px 160px 0 0 ${color2}, 135px 160px 0 0 ${color2}, 140px 160px 0 0 ${color2}, 145px 160px 0 0 ${color2},
      150px 160px 0 0 ${color2}, 155px 160px 0 0 ${color2}, 160px 160px 0 0 ${color2}, 165px 160px 0 0 ${color2},
      170px 160px 0 0 ${color2}, 175px 160px 0 0 ${color2}, 180px 160px 0 0 ${color2}, 185px 160px 0 0 ${color2},
      190px 160px 0 0 ${color2}, 195px 160px 0 0 ${color2}, 200px 160px 0 0 ${color2}, 205px 160px 0 0 ${color2},
      210px 160px 0 0 ${color2}, 215px 160px 0 0 ${color2}, 220px 160px 0 0 ${color2}, 225px 160px 0 0 ${color2},
      230px 160px 0 0 ${color2}, 235px 160px 0 0 ${color2}, 240px 160px 0 0 ${color2}, 245px 160px 0 0 ${color2},
      250px 160px 0 0 ${color2}, 255px 160px 0 0 ${color1}, 260px 160px 0 0 ${color1}, 265px 160px 0 0 ${color1},
      270px 160px 0 0 ${darkenColor(color2,20)}, 275px 160px 0 0 ${darkenColor(color2,20)}, 5px 165px 0 0 ${darkenColor(color2,20)}, 10px 165px 0 0 ${darkenColor(color2,20)},
      15px 165px 0 0 ${darkenColor(color2,20)}, 20px 165px 0 0 ${color1}, 25px 165px 0 0 ${color2}, 30px 165px 0 0 ${color2},
      35px 165px 0 0 ${color2}, 40px 165px 0 0 ${color2}, 45px 165px 0 0 ${color2}, 50px 165px 0 0 ${color2},
      55px 165px 0 0 ${color2}, 60px 165px 0 0 ${color2}, 65px 165px 0 0 ${color2}, 70px 165px 0 0 ${color2},
      75px 165px 0 0 ${color2}, 80px 165px 0 0 ${color2}, 85px 165px 0 0 ${color2}, 90px 165px 0 0 ${color2},
      95px 165px 0 0 ${color2}, 100px 165px 0 0 ${color2}, 105px 165px 0 0 ${color2}, 110px 165px 0 0 ${color2},
      115px 165px 0 0 ${color2}, 120px 165px 0 0 ${color2}, 125px 165px 0 0 ${color2}, 130px 165px 0 0 ${color2},
      135px 165px 0 0 ${color2}, 140px 165px 0 0 ${color2}, 145px 165px 0 0 ${color2}, 150px 165px 0 0 ${color2},
      155px 165px 0 0 ${color2}, 160px 165px 0 0 ${color2}, 165px 165px 0 0 ${color2}, 170px 165px 0 0 ${color2},
      175px 165px 0 0 ${color2}, 180px 165px 0 0 ${color2}, 185px 165px 0 0 ${color2}, 190px 165px 0 0 ${color2},
      195px 165px 0 0 ${color2}, 200px 165px 0 0 ${color2}, 205px 165px 0 0 ${color2}, 210px 165px 0 0 ${color2},
      215px 165px 0 0 ${color2}, 220px 165px 0 0 ${color2}, 225px 165px 0 0 ${color2}, 230px 165px 0 0 ${color2},
      235px 165px 0 0 ${color2}, 240px 165px 0 0 ${color2}, 245px 165px 0 0 ${color2}, 250px 165px 0 0 ${color2},
      255px 165px 0 0 ${color2}, 260px 165px 0 0 ${color1}, 265px 165px 0 0 ${darkenColor(color2,20)}, 270px 165px 0 0 ${darkenColor(color2,20)},
      275px 165px 0 0 ${darkenColor(color2,20)}, 5px 170px 0 0 ${darkenColor(color2,20)}, 10px 170px 0 0 ${darkenColor(color2,20)}, 15px 170px 0 0 ${darkenColor(color2,20)},
      20px 170px 0 0 ${darkenColor(color2,20)}, 25px 170px 0 0 ${darkenColor(color2,20)}, 30px 170px 0 0 ${darkenColor(color2,20)}, 35px 170px 0 0 ${darkenColor(color2,20)},
      40px 170px 0 0 ${darkenColor(color2,20)}, 45px 170px 0 0 ${darkenColor(color2,20)}, 50px 170px 0 0 ${darkenColor(color2,20)}, 55px 170px 0 0 ${darkenColor(color2,20)},
      60px 170px 0 0 ${darkenColor(color2,20)}, 65px 170px 0 0 ${darkenColor(color2,20)}, 70px 170px 0 0 ${darkenColor(color2,20)}, 75px 170px 0 0 ${darkenColor(color2,20)},
      80px 170px 0 0 ${darkenColor(color2,20)}, 85px 170px 0 0 ${darkenColor(color2,20)}, 90px 170px 0 0 ${darkenColor(color2,20)}, 95px 170px 0 0 ${darkenColor(color2,20)},
      100px 170px 0 0 ${darkenColor(color2,20)}, 105px 170px 0 0 ${darkenColor(color2,20)}, 110px 170px 0 0 ${darkenColor(color2,20)}, 115px 170px 0 0 ${darkenColor(color2,20)},
      120px 170px 0 0 ${darkenColor(color2,20)}, 125px 170px 0 0 ${darkenColor(color2,20)}, 130px 170px 0 0 ${darkenColor(color2,20)}, 135px 170px 0 0 ${darkenColor(color2,20)},
      140px 170px 0 0 ${darkenColor(color2,20)}, 145px 170px 0 0 ${darkenColor(color2,20)}, 150px 170px 0 0 ${darkenColor(color2,20)}, 155px 170px 0 0 ${darkenColor(color2,20)},
      160px 170px 0 0 ${darkenColor(color2,20)}, 165px 170px 0 0 ${darkenColor(color2,20)}, 170px 170px 0 0 ${darkenColor(color2,20)}, 175px 170px 0 0 ${darkenColor(color2,20)},
      180px 170px 0 0 ${darkenColor(color2,20)}, 185px 170px 0 0 ${darkenColor(color2,20)}, 190px 170px 0 0 ${darkenColor(color2,20)}, 195px 170px 0 0 ${darkenColor(color2,20)},
      200px 170px 0 0 ${darkenColor(color2,20)}, 205px 170px 0 0 ${darkenColor(color2,20)}, 210px 170px 0 0 ${darkenColor(color2,20)}, 215px 170px 0 0 ${darkenColor(color2,20)},
      220px 170px 0 0 ${darkenColor(color2,20)}, 225px 170px 0 0 ${darkenColor(color2,20)}, 230px 170px 0 0 ${darkenColor(color2,20)}, 235px 170px 0 0 ${darkenColor(color2,20)},
      240px 170px 0 0 ${darkenColor(color2,20)}, 245px 170px 0 0 ${darkenColor(color2,20)}, 250px 170px 0 0 ${darkenColor(color2,20)}, 255px 170px 0 0 ${darkenColor(color2,20)},
      260px 170px 0 0 ${darkenColor(color2,20)}, 265px 170px 0 0 ${darkenColor(color2,20)}, 270px 170px 0 0 ${darkenColor(color2,20)}, 275px 170px 0 0 ${darkenColor(color2,20)},
      10px 175px 0 0 ${darkenColor(color2,20)}, 15px 175px 0 0 ${darkenColor(color2,20)}, 20px 175px 0 0 ${darkenColor(color2,20)}, 25px 175px 0 0 ${darkenColor(color2,20)},
      30px 175px 0 0 ${darkenColor(color2,20)}, 35px 175px 0 0 ${darkenColor(color2,20)}, 40px 175px 0 0 ${darkenColor(color2,20)}, 45px 175px 0 0 ${darkenColor(color2,20)},
      50px 175px 0 0 ${darkenColor(color2,20)}, 55px 175px 0 0 ${darkenColor(color2,20)}, 60px 175px 0 0 ${darkenColor(color2,20)}, 65px 175px 0 0 ${darkenColor(color2,20)},
      70px 175px 0 0 ${darkenColor(color2,20)}, 75px 175px 0 0 ${darkenColor(color2,20)}, 80px 175px 0 0 ${darkenColor(color2,20)}, 85px 175px 0 0 ${darkenColor(color2,20)},
      90px 175px 0 0 ${darkenColor(color2,20)}, 95px 175px 0 0 ${darkenColor(color2,20)}, 100px 175px 0 0 ${darkenColor(color2,20)}, 105px 175px 0 0 ${darkenColor(color2,20)},
      110px 175px 0 0 ${darkenColor(color2,20)}, 115px 175px 0 0 ${darkenColor(color2,20)}, 120px 175px 0 0 ${darkenColor(color2,20)}, 125px 175px 0 0 ${darkenColor(color2,20)},
      130px 175px 0 0 ${darkenColor(color2,20)}, 135px 175px 0 0 ${darkenColor(color2,20)}, 140px 175px 0 0 ${darkenColor(color2,20)}, 145px 175px 0 0 ${darkenColor(color2,20)},
      150px 175px 0 0 ${darkenColor(color2,20)}, 155px 175px 0 0 ${darkenColor(color2,20)}, 160px 175px 0 0 ${darkenColor(color2,20)}, 165px 175px 0 0 ${darkenColor(color2,20)},
      170px 175px 0 0 ${darkenColor(color2,20)}, 175px 175px 0 0 ${darkenColor(color2,20)}, 180px 175px 0 0 ${darkenColor(color2,20)}, 185px 175px 0 0 ${darkenColor(color2,20)},
      190px 175px 0 0 ${darkenColor(color2,20)}, 195px 175px 0 0 ${darkenColor(color2,20)}, 200px 175px 0 0 ${darkenColor(color2,20)}, 205px 175px 0 0 ${darkenColor(color2,20)},
      210px 175px 0 0 ${darkenColor(color2,20)}, 215px 175px 0 0 ${darkenColor(color2,20)}, 220px 175px 0 0 ${darkenColor(color2,20)}, 225px 175px 0 0 ${darkenColor(color2,20)},
      230px 175px 0 0 ${darkenColor(color2,20)}, 235px 175px 0 0 ${darkenColor(color2,20)}, 240px 175px 0 0 ${darkenColor(color2,20)}, 245px 175px 0 0 ${darkenColor(color2,20)},
      250px 175px 0 0 ${darkenColor(color2,20)}, 255px 175px 0 0 ${darkenColor(color2,20)}, 260px 175px 0 0 ${darkenColor(color2,20)}, 265px 175px 0 0 ${darkenColor(color2,20)},
      270px 175px 0 0 ${darkenColor(color2,20)}
    `,
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Casset Color Picker :)</h1>
      <div className="pixelart-container">
        {/* <div className="ghost-pixelart" style={ghostStyle}></div> */}
        <div className="casset-pixelart" style={cassetStyle}></div>
        {/* <div className="casset-pixelart-animation"></div> */}
      </div>
      {/* <input type="text" id="hex" value={hex}></input>
      <input
        type="color"
        id="color"
        value={color}
        onChange={handleColorChange}
      ></input> */}
      {/* <input type="text" id="hex" value={hex2}></input>
      <input
        type="color"
        id="color"
        value={color2}
        onChange={handleColor2Change}
      ></input>
      <input type="text" id="hex" value={hex1}></input>
      <input
        type="color"
        id="color"
        value={color1}
        onChange={handleColor1Change}
      ></input>
      <input type="text" id="hex" value={hex4}></input>
      <input
        type="color"
        id="color"
        value={color4}
        onChange={handleColor4Change}
      ></input>
      <input type="text" id="hex" value={hex3}></input>
      <input
        type="color"
        id="color"
        value={color3}
        onChange={handleColor3Change}
      ></input> */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '5vw' }}>
        <ColorPicker color={color2} onChange={setColor2} />
        <ColorPicker color={color1} onChange={setColor1} />
        <ColorPicker color={color4} onChange={setColor4} />
        <ColorPicker color={color3} onChange={setColor3} />
      </div>
      <button id="saveButton" onClick={handleSaveImage}>
        Save
      </button>
      <button id="resetButton" onClick={handleResetImage}>
        Reset
      </button>
    </div>
  );
}

export default App;