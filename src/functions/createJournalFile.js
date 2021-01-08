import download from 'downloadjs'
import axios from 'axios'

export const downloadJournal = async () => {
    axios({
      url: 'http://localhost:5000/api/users/download_journal',
      method: 'GET',
      headers: { "x-auth-token": localStorage.getItem("auth-token") }
    }).then(res => download(res.data, "test.html", 'html'))
  }