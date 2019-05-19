/* eslint-disable max-len */
export default class AppModel {
  constructor(state, query) {
    this.state = state;
    this.query = query;
    this.next = '';
  }

  static extractClipIDs(data) {
    this.next = data.nextPageToken;
    return data.items.map(clip => clip.id.videoId).join(',');
  }

  static extractClipData(data) {
    const outItems = [];
    data.items.forEach((item) => {
      const arr = [];
      arr.push(item.id); // this is yutube video id
      arr.push(item.snippet.channelTitle); // this is yutube video author (channel)
      arr.push(item.snippet.title); // this is yutube video title snippet
      arr.push(item.snippet.description); // this is yutube video description snippet
      const published = new Date(item.snippet.publishedAt);
      arr.push(published.toLocaleDateString()); // this is converted date of youtube video snippet
      arr.push(item.statistics.viewCount); // this is viewCount of youtube video snippet
      arr.push(item.snippet.thumbnails.medium.url);
      outItems.push(arr); // ['Id', 'chlTitle', 'Title', 'Descr', 'Date', 'Views', Thumb]
    });
    return outItems;
  }

  async getClipData() {
    const {
      url, key, methods: {
        searchMethod, searchAdd, videoMethod, videoAdd,
      },
    } = this.state;

    const qIDs = `${url}${searchMethod}?key=${key}&${searchAdd}&q=${this.query}`;
    const respGetIDs = await fetch(qIDs);
    const dataGetIDs = await respGetIDs.json();
    this.next = dataGetIDs.nextPageToken;
    const IDs = AppModel.extractClipIDs(dataGetIDs);

    const qData = `${url}${videoMethod}?key=${key}&id=${IDs}&${videoAdd}`;
    const respGetData = await fetch(qData);
    const dataGetData = await respGetData.json();
    return AppModel.extractClipData(dataGetData);
  }

  async getClipDataNext() {
    const {
      url, key, lastQuery, nextSearch, methods: {
        searchMethod, searchAdd, videoMethod, videoAdd,
      },
    } = this.state;
    const qIDs = `${url}${searchMethod}?key=${key}&${searchAdd}&q=${lastQuery}&pageToken=${nextSearch}`;
    const respGetIDs = await fetch(qIDs);
    const dataGetIDs = await respGetIDs.json();
    this.next = dataGetIDs.nextPageToken;
    const IDs = AppModel.extractClipIDs(dataGetIDs);


    const qData = `${url}${videoMethod}?key=${key}&id=${IDs}&${videoAdd}`;
    const respGetData = await fetch(qData);
    const dataGetData = await respGetData.json();
    return AppModel.extractClipData(dataGetData);
  }
}
