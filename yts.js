const yt = require("ytdl-core");
const yts = require("yt-search");
const axios = require('axios');

const getBuffer = async (url, options) => {
try {
options ? options : {};
const res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
});
return res.data;
} catch (e) {
console.log(`Error : ${e}`);
};
};


async function ytSearchss(query) {
try {
 const caris = await yts(query)
  .then((data) => data.videos[0].url);
  cariss = caris.split("https").join("").split("http").join("");
   return cariss;
 } catch(e) {
  console.log("Erro: " + e);
 };
};


function ytDonlodMp3s(url) {
  return new Promise((resolve, reject) => {
   queryLimp = url
    .split("://gaming.youtube.com/watch?v=").join("")
      .split("://music.youtube.com/watch?v=").join("")
       .split("://www.youtube.com/watch?v=").join("")
        .split("://www.youtube.com/embed/").join("")
         .split("://m.youtube.com/watch?v=").join("")
        .split("://youtube.com/watch?v=").join("")
       .split("://youtube.com/shorts/").join("")
      .split("://www.youtube.com").join("")
     .split("://youtu.be/").join("")
    .split("?feature=share").join("");
   const yutub = yt.getInfo("https://www.youtube.com/watch?v=" + queryLimp)
      .then(async(data) => {
      let pormat = data.formats;
        let audio = [];
        let audio2 = [];
        for (let i = 0; i < pormat.length; i++) {
        if (pormat[i].container == 'webm' && pormat[i].mimeType == 'audio/webm; codecs="opus"' && pormat[i].hasAudio == true && pormat[i].hasVideo == false) {
            let aud = pormat[i];
            audio2.push({url: aud.url});
         };
        if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
            let vid = pormat[i];
            audio.push({url: vid.url});
         };
        };
        const vidJson = data.player_response.microformat.playerMicroformatRenderer;
        const title = vidJson.title.simpleText;
        const thumb = vidJson.thumbnail.thumbnails[0].url;
        const author = vidJson.ownerChannelName;
        const link_canal = vidJson.ownerProfileUrl;
        const views = vidJson.viewCount;
        const categoria = vidJson.category;
        const published = vidJson.publishDate;
        const perfil = vidJson.ownerProfileUrl;

    let rell = [];
    let relacion = data.related_videos;
        for (let i = 0; i < relacion.length; i++) {
         if (relacion[i].isLive == false) {
            let vid = relacion[i];
            rell.push({
              id: vid.id,
              titulo: vid.title,
              live: vid.isLive,
              thumb: vid.thumbnails[0].url,
              publicado: vid.published,
              views: vid.short_view_count_text,
              author: vid.author.name,
              perfil: vid.author.thumbnails[0].url,
              canal: vid.author.channel_url,
              id_canal: vid.author.id
             });
          };
        };

   //   axios.get("https://tinyurl.com/api-create.php?url=" + audio2[0].url)
   //    .then(ress => ress.data)
   //      .then(ross2 => {
   // axios.get("https://tinyurl.com/api-create.php?url=" + audio[0].url)
   //      .then(res => res.data)
   //      .then(ross => {
       getBuffer(audio[0].url)
       .then(audioBuff => {
      const result = {
          id: queryLimp,
          title: title,
          thumb: thumb,
          channel: author,
          perfil: perfil,
          published: published,
          views: views,
          link_canal: link_canal,
          categoria: categoria,
          audio: Buffer.from(audioBuff).toString("base64"),
          audio2: audio2[0].url,
          descricao: vidJson.description ? vidJson.description.simpleText : " ",
          relacionados: rell
        };
      resolve(result);
      });
    //  });
      })
      .catch(error => {
        resolve({erro: "Conteúdo não encontrado... \nVerifique se o link está correto!"});
        reject(error);
     });
  });
};


async function ytDonlodMp3(querys) {
   let limpInfo = querys.split("https").join("").split("http").join("");
  if(querys.includes("https") || querys.includes("http")) {
   console.log("BUSCAR LINKS");
   return await ytDonlodMp3s(limpInfo);
  } else {
   console.log("BUSCAR NOMES / ID");
   jhh = await ytSearchss(querys);
   return await ytDonlodMp3s(jhh);
  };
};

function ytDonlodMp4s(url) {
  return new Promise(async(resolve, reject) => {
  try {
   queryLimp = url
     .split("://gaming.youtube.com/watch?v=").join("")
      .split("://music.youtube.com/watch?v=").join("")
       .split("://www.youtube.com/watch?v=").join("")
        .split("://www.youtube.com/embed/").join("")
         .split("://m.youtube.com/watch?v=").join("")
        .split("://youtube.com/watch?v=").join("")
       .split("://youtube.com/shorts/").join("")
      .split("://www.youtube.com").join("")
     .split("://youtu.be/").join("")
    .split("?feature=share").join("");
   const data = await yt.getInfo("https://www.youtube.com/watch?v=" + queryLimp)
   const pormat = data.formats;
        let video = [];
        for (let i = 0; i < pormat.length; i++) {
         if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
         const rot = /*await axios.get("https://tinyurl.com/api-create.php?url=" + */pormat[i].url
         //.then(ress => ress.data)
//         "144p" && "240p" && "360p" && "480p" && "720p" && "1080p" && "1440p" && "2160p"
            let vid = pormat[i];
            video.push({url: rot, qualidade: vid.qualityLabel, tipo: vid.container, formato: vid.projectionType, fps: vid.fps, live: vid.isLive});
/*            
         mimeType: 'video/mp4; codecs="avc1.42001E, mp4a.40.2"',
    qualityLabel: '360p',
    bitrate: 158780,
    audioBitrate: 96,
    itag: 18,
    width: 360,
    height: 360,
    lastModified: '1664128117556348',
    quality: 'medium',
    fps: 25,
    projectionType: 'RECTANGULAR',
    audioQuality: 'AUDIO_QUALITY_LOW',                         approxDurationMs: '302161',
    audioSampleRate: '44100',
    audioChannels: 2,
    url: 'https://rr2---sn-bufxoutuxax-8qje.googlevideo.com/videoplayback?expire=1670353075&ei=UzyPY-LgH8fOwQSDoZfoBw&ip=179.48.127.47&id=o-AP2fvu9AQSBmiHumSN38kjS6CheJc-8lRpWhe3nDVe62&itag=18&source=youtube&requiressl=yes&mh=q5&mm=31%2C29&mn=sn-bufxoutuxax-8qje%2Csn-pmcg-bg0s&ms=au%2Crdu&mv=m&mvi=2&pl=24&gcr=br&initcwndbps=611250&vprv=1&mime=video%2Fmp4&ns=zlJo2fOTofDI80WvH2wfFdkJ&cnr=14&ratebypass=yes&dur=302.161&lmt=1664128117556348&mt=1670330963&fvip=9&fexp=24001373%2C24007246&c=WEB&txp=5538434&n=3WlOQC7CFfSfcA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgOiGsVdNU7lpWiZ3wQ3Iov105o45k5ePPnYBukeDORGQCIQCmXqw7g7FEnZxnD5yCEkUXxMQH8nC6AizCdqswiPOxAA%3D%3D&sig=AOq0QJ8wRAIgAzM2Dh_tDyAtgsGDArZB_IWGPr4--uvx3nY5dcrYf_sCICJH9sNtXE5CJKzDMV-JCLGUshcZ-jKs2rSaJ7A6LXSA',                                   hasVideo: true,                                            hasAudio: true,                                            container: 'mp4',
    codecs: 'avc1.42001E, mp4a.40.2',
    videoCodec: 'avc1.42001E',
    audioCodec: 'mp4a.40.2',
    isLive: false,
    isHLS: false,
    isDashMPD: false
*/
        };
        };
        let vidSort = video.sort((a, b) => {
          if (parseInt(a.qualidade) > parseInt(b.qualidade)) return -1;
            return 1;
        });
        const vidJson = data.player_response.microformat.playerMicroformatRenderer;
        const title = vidJson.title.simpleText;
        const thumb = vidJson.thumbnail.thumbnails[0].url;
        const author = vidJson.ownerChannelName;
        const link_canal = vidJson.ownerProfileUrl;
        const views = vidJson.viewCount;
        const categoria = vidJson.category;
        const published = vidJson.publishDate;
        const perfil = vidJson.ownerProfileUrl;

    let rell = [];
    let relacion = data.related_videos;
        for (let i = 0; i < relacion.length; i++) {
         if (relacion[i].isLive == false) {
            let vid = relacion[i];
            rell.push({
              id: vid.id,
              titulo: vid.title,
              live: vid.isLive,
              thumb: vid.thumbnails[0].url,
              publicado: vid.published,
              views: vid.short_view_count_text,
              author: vid.author.name,
              perfil: vid.author.thumbnails[0].url,
              canal: vid.author.channel_url,
              id_canal: vid.author.id
             });
          };
        };
      const result = {
          id: queryLimp,
          title: title,
          thumb: thumb,
          channel: author,
          perfil: perfil,
          published: published,
          views: views,
          link_canal: link_canal,
          categoria: categoria,
          videos: vidSort,
          descricao: vidJson.description ? vidJson.description.simpleText : " ",
          relacionados: rell
        };
      resolve(result);
     } catch(error){
        resolve({erro: "Conteúdo não encontrado... \nVerifique se o link está correto!"});
        reject(error);
     };
  });
};


async function ytDonlodMp4(querys) {
   let limpInfo = querys.split("https").join("").split("http").join("");
  if(querys.includes("https") || querys.includes("http")) {
   console.log("BUSCAR LINKS");
   return await ytDonlodMp4s(limpInfo);
  } else {
   console.log("BUSCAR NOMES / ID");
   jhh = await ytSearchss(querys);
   return await ytDonlodMp4s(jhh);
  };
};


//ytDonlodMp4("https://youtube.com/shorts/H2hVLYVbHu0?feature=share")
//.then(console.log)


module.exports = {
  ytDonlodMp3,
  ytDonlodMp4
};
