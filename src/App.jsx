import { useState } from 'react'
import { items } from './items'

function App() {
  const [leftItems, setLeftItems] = useState(items)
  const [rightItems,setRightItems]=useState([])
  
  const helper=(list,id,checked)=>{
    return list.map((item)=>{
      console.log("hello");
      if(item.id===id){
        return {
          ...item,
          checked:!checked
          
          
        }
      }
      return item
    })
  }
  const handleClick=(id,checked,direction)=>{
      if(direction==='left'){
        let copylist=[...leftItems];
        copylist=helper(copylist,id,checked);
        setLeftItems(copylist)
      }else{
        let copylist=[...rightItems];
        copylist=helper(copylist,id,checked);
        setRightItems(copylist)
      }
  }
  const  onSubmitHandler=(direction)=>{
      if(direction==='right'){
        let check=leftItems.filter((item)=>item.checked)
        let uncheck=leftItems.filter((item)=>!item.checked)
        let res=check.map((item)=>{
          return {
            ...item,
            checked:!item.checked
          }
        })
        let bucket=[...rightItems,...res]
        setRightItems(bucket);
        setLeftItems(uncheck)
        
      }else{
        let check=rightItems.filter((item)=>item.checked)
        let uncheck=rightItems.filter((item)=>!item.checked)
        let res=check.map((item)=>{
          return {
            ...item,
            checked:!item.checked
          }
        })
        let bucket=[...leftItems,...res]
        setLeftItems(bucket);
        setRightItems(uncheck)
      }
  }
  return (
    <>
    <h1 className='text-center pt-40 text-lg font-bold text-red-800'>Select Item From one bucket and Shift to Another </h1>
    <div className='flex text-center justify-center mt-40 items-center'>
      <div className='flex flex-col gap-2 bg-zinc-500 w-44 h-40 p-1'>
         {
          leftItems.map((item,index)=>(
            <div 
            className={`${item.checked?"bg-black":"bg-amber-600"} mx-auto p-1 rounded-lg text-white cursor-pointer`}
            key={index}
            onClick={()=>handleClick(item.id,item.checked,'left')}
            >{item.name}</div>
          ))
         }
      </div>
      <div className='flex flex-col'>
      <button className=' bg-stone-700 text-white p-1 rounded-lg m-2 hover:scale-90'
      onClick={()=>onSubmitHandler('right')}
      >Right</button>
      <button className=' bg-stone-700 text-white p-1 rounded-lg m-2 hover:scale-90'
       onClick={()=>onSubmitHandler('left')}
      >Left</button>
      </div>
      <div className='flex flex-col gap-2 bg-zinc-500 w-44 h-40 p-1'>
         {
          rightItems.map((item,index)=>(
            <div 
            className={`${item.checked?"bg-black":"bg-amber-600"} mx-auto p-1 rounded-lg text-white cursor-pointer`}
            key={index}
            onClick={()=>handleClick(item.id,item.checked,'right')}
            >{item.name}</div>
          ))
         }
      </div>
    </div>
    </>
  )
}

export default App
