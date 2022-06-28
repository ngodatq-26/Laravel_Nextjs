import React from 'react'
import { emoticon } from 'emoticon'
import { ChangeToEmoticon,ChangeInputEmoticon} from '../utils/constant';

const Test = () => {

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
      a.pop();
      a.pop();
      a.push(emoji);
      var s ='';
      for(let i = 0;i<a.length;i++) {
        s = s + a[i];
      }
      setText(s);
      setEmoji();
    }
  },[text])

  return (
    <div> 
      <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
      <div>{emoji}</div>
    </div>
  )
}

export default Test