### todo
- In subscriptions, show which ones are already added in Watch Later playlist
- show which have been deleted
- var for yt wl list of all vids: 
var initData = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;
var vLengthList = [];
initData.forEach((el) => 
    vLengthList.push(el.playlistVideoRenderer.lengthSeconds)
);

console.log(vLengthList);
const sum = sumArrayItems(vLengthList);
console.log(sum);

function sumArrayItems(arr) {
    return arr.reduce((sum, item) => sum + Number(item), 0);
}
