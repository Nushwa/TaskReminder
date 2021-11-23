import React, {useState, useEffect} from 'react';
import {Reminder} from './Components/Reminder'


function App() {
 const [focusSubject, setFocusSubject] = useState(null);

  return (
   <Reminder addSubject={setFocusSubject} />
  );
}

export default App;