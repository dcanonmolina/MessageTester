import React, { useState, useEffect } from 'react'
import {Client as SyncClient} from 'twilio-sync';
import MessageList from '../components/MessageList'
import getToken from '../services/syncManager'
import utilities from '../utilities/utilities'
import '../indexTxt.css'

const PanelHistory = (props) => {

    const [listMessages, setListMessages] = useState([])
    const [loading, setLoading] =  useState(true)
    const [newItem, setNewItem] = useState([])
    let client;

    
    const initialItemLoad = (syncList) =>{


      const pageHandler = (paginator) => {
        let items = [];
        paginator.items.forEach((item) => {
            console.log(`Item ${item.index}:`, item.data);
            items.push(item.data)
        });

        setListMessages(listMessages.concat(items))

        if(paginator.hasNextPage){
          
          paginator.nextPage().then(pageHandler)
        }
        else
          return  null;
      };

      return syncList.getItems({  order: 'desc' })
        .then( pageHandler)
        .then(syncList)
        .catch((error) => {
          console.error('List getItems() failed', error);
        });

    }

    const refreshSyncClient=(token)=>{
      client.updateToken(token)
    }


    const createSyncClient= (accessToken) =>{
      client = new SyncClient(accessToken, { logLevel: 'info' });
      const listName = utilities.getListName();

      client.list({id:listName,ttl:43200})
          .then(list => {
            initialItemLoad(list);
            list.on('itemAdded',  (args) => setNewItem([args.item.data]));
          });
    };

    const obtainToken=(identity)=>{

      getToken(identity)
      .then(accessToken => {
        console.log(accessToken)
        if (client) {
          // update the sync client with a new access token
          refreshSyncClient(accessToken);
        } else {
          // create a new sync client
          createSyncClient(accessToken);
        }
      })

    }

    useEffect(()=> {
      if(loading)
      {
        obtainToken(props.identity);
        setLoading(false)
      }
    },[loading])

    useEffect(()=>{

      console.log('al anadir')
      console.log(listMessages)
      let newArray = newItem.concat(listMessages)
      setListMessages(newArray);

    },[newItem])

    return (
      <div>
        <div id="inboundMessageHeader">
          <div className='fieldColumnWidth'>Date</div>
          <div className='fieldColumnWidth'>Message Sid</div>
          <div className='fieldColumnWidth'>Phone Number</div>
          <div className='fieldColumnWidth'>From</div>
          <div className='fieldColumnWidth'>Body</div>
        </div>
        <MessageList data={listMessages}/>
      </div>
  
    );
  }

export default PanelHistory;