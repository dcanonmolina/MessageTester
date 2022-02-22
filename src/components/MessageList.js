import React from 'react'
import '../indexTxt.css'

const MessageList =(props)=>{

    return (
        <div>
        {
            props.data.map(listItem => (
                
                <div key={listItem.SID}>
                    <div className='fieldColumnWidth'>{listItem.date}</div>
                    <div className='fieldColumnWidth'>{listItem.SID}</div>
                    <div className='fieldColumnWidth'>{listItem.phoneNumber}</div>
                    <div className='fieldColumnWidth'>{listItem.from}</div>
                    <div className='fieldColumnWidth'>{listItem.message}</div>
                </div>
            ))
        }
        </div>
    );
}

export default MessageList;