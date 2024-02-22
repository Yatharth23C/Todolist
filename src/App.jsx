import { useState, useEffect ,Date } from 'react'
import { v4 as uuidv4 } from 'uuid';


function App() {
  
  const defaulttext = "Add a task...";
  const [inputtext, setinputtext] = useState(defaulttext)  
  const [note, setnote] = useState("")
  const [savedNotes, setSavedNotes] = useState(() => JSON.parse(localStorage.getItem('sNotes')) || []);


  useEffect(() => {
    
    localStorage.setItem('sNotes',JSON.stringify(savedNotes))
    
  }, [savedNotes])
  useEffect(()=>{
  
    const saveNotesFromStorage = JSON.parse(localStorage.getItem('sNotes'));
    if(saveNotesFromStorage){
      setSavedNotes(saveNotesFromStorage)

    }

  },[])
  
  const deletenote = (id)=>{

    const updatednotes = savedNotes.filter(note=>note.id!=id)
    
    localStorage.setItem('sNotes', JSON.stringify(updatednotes));
    setSavedNotes(updatednotes)
    
  }
  const handlechange = (e)=>{

    setinputtext(e.target.value) 

  }
  const handlefocus = ()=>{
    if(inputtext === defaulttext){
      setinputtext('')
    }
  }
  const handleeditnote =(editednote,id)=>{
  
    setinputtext(editednote)
    const updatednotes = savedNotes.filter(note=>note.id!=id)
    
    localStorage.setItem('sNotes', JSON.stringify(updatednotes));
    setSavedNotes(updatednotes)
  }

  const savenote = () => {
    const newNote = {
      id: uuidv4(), // Generate a unique id based on the current timestamp
      text: inputtext
      
    };
    console.log(uuidv4() )
    setSavedNotes([...savedNotes, newNote]); // Add the new note to the existing notes array
    setinputtext(defaulttext); // Reset input field to default text
  };
 
  useEffect(() => {
    console.log(note);
  }, [note]);

 
  
  return (
    <>
    
    <div className='flex  bg-green-300 w-[100%] h-[100vh] '>
      <div className='containerr flex flex-col w-[35%] justify-center max-h-[80vh]  mx-auto  m-10 '>

        <div className="navbar text-xl bg-green-600 flex flex-row w-[100%] justify-between">
          <span>Todo List</span>
        </div>
        <div className='inputtext  justify-self-center ml-10 mt-4 mb-4 mr-10   flex flex-row '>

          <input onChange={handlechange} onFocus={handlefocus} type="text" value={inputtext} className=' bg-green-300 w-full outline-none ' />

          <svg  onClick={savenote} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="current" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus bg-green-300 w-[23px]"><path d="M5 12h14" /><path d="M12 5v14" /></svg>

        </div>

       <div className='mynotes flex flex-col bg-green-500 min-h-[400px] text-center overflow-y-scroll text-xl'> 
       <span className='bg-green-950  text-white p-3'>MyNotes</span>

       {savedNotes.length === 0 ? (
          <div>No notes to display</div>
        ) : (
       <div>
        {savedNotes.map((savednote)=>(<>
        <div className='flex flex-row align-middle  m-3'>
           <div  key = {savednote.id} className="note w-full  bg-green-200 mt-3 mb-3">{savednote.text} </div>
           <svg onClick={()=>{deletenote(savednote.id)}} xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide  relative top-3 ml-1 lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
           <svg onClick={()=>{handleeditnote(savednote.text,savednote.id)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide relative top-3 ml-2 lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
           </div>
        </>
        ))}
      
        </div>
        )}
        </div>
        </div>
      </div>
      
    </>
  )
}

export default App
