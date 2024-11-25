import React, { useState, useEffect, useCallback } from 'react'

interface colorsList {
  name: string,
  theme: string,
  group: string,
  hex: string,
  rgb: string
}

const App: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>("#ffff");
  const [colorsList, setColorsList] = useState<colorsList[]>([]);

  useEffect(() => {
    fetch('https://www.csscolorsapi.com/api/colors')
    .then((res)=> res.json())
    .then(data => {
    
      console.log(data)
      setColorsList(data.colors)
    });
 
  }, [])
  

  const changeBGcolor = useCallback((color:string) => {
    color = "#" + color;
    setBgColor(color);
  }, [colorsList])

  return (
    <>
      <div   style={{backgroundColor: `${bgColor}`}}>
      {colorsList && colorsList.map((color, index) => (

        <div key={index} className={`h-10 w-10 border rounded-lg mb-2 ml-2 hover:border-2 group relative`} style={{backgroundColor: `#${color?.hex}`}}
        onClick={() => changeBGcolor(color?.hex)}>
          <span className='absolute top-1/2 left-full ml-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-sm rounded px-4 py-2 shadow-lg'>{color?.name}</span>
        </div>
      ))}
        
      </div>
    </>
  )
}

export default App