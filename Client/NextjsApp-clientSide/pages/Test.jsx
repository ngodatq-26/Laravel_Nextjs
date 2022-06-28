import React from 'react'
import { emoticon } from 'emoticon'
import { ChangeToEmoticon,ChangeInputEmoticon} from '../utils/constant';

const Test = () => {

  console.log(emoticon);

  const callback = (e) => {
    setEmoji(e)
  }

  const callback2 = (e) => {
    setText(e)
  }

  const [text,setText] = React.useState();
  const [emoji,setEmoji] = React.useState();
  
  React.useEffect(() => {
    ChangeInputEmoticon(text,callback);  
    if(emoji) {
      const a = text.split(' ');
      console.log(a);
      a.pop();
      a.pop();
      a.push(emoji);
      console.log(a);
      var s ='';
      for(let i = 0;i<a.length;i++) {
        s = s + a[i];
      }
      setText(s);
      setEmoji();
    }
  },[text])

  console.log(text)
  return (
    <div> 
      <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
      <div>{emoji}</div>
    </div>
  )
}

export default Test