# lowkeydd-dev

主要功能為獲取 youtube 與 twitch 兩平台上的直播訊息後，讓使用者跨平台觀看直播內容，註冊會員後還能自訂自己喜歡的直播內容。 

網址連結: https://lowkeydd.ddnsking.com/#/channels/


<h4>功能介面總覽</h4>

![圖片](https://user-images.githubusercontent.com/23102035/128872000-f7777e91-3552-448f-a42d-c25de8e2dc30.png)

<h4>功能說明</h4>
<p>
  登入與否都能使用，但是如果想要自定義自己喜歡的頻道可以參考下面的功能介紹
</p>


<h4>步驟一 : 頻道搜尋</h4>
<p>
  第一步，輸入頻道網址來獲取頻道資訊。
  
  以星姊的頻道為例，我們成功獲取她正在直播的頻道訊息。
</p>

![圖片](https://user-images.githubusercontent.com/23102035/128879471-b9ea35b8-f609-49a2-8200-377711f88918.png)



<h4>頻道搜尋錯誤或失敗</h4>

<p>
  假如搜尋成功，可以跳過這邊的說明。
  
  由於目前搜尋功能僅支援youtube和twitch兩主流平台的頻道搜尋，
  
  且需要提供特定格式的網址或關鍵字作為搜尋依據，以下為兩種可能出現的搜尋錯誤:
</p>

<h5>錯誤一 : 無效格式</h5>

![圖片](https://user-images.githubusercontent.com/23102035/128882350-b229f0da-3f5b-4048-a5e0-75f23dbab2f8.png)

<p>
  假如你出現以上的錯誤，表示你所輸入網址無法被順利解析，
  
  解決方式可以參考以下正確的範例:
</p>

````
youtube: https://www.youtube.com/channel/xxxx // xxxx為任意，不要真得打xxxx

twitch:  https://www.twitch.tv/xxxx // xxxx為任意，不要真得打xxxx
````

<h5>錯誤二 : 獲取頻道訊息失敗</h5>

![圖片](https://user-images.githubusercontent.com/23102035/128882182-1342341f-3bf2-427f-a4af-97e7b386478f.png)

<p>
  以上錯誤表示該網址雖然被順利解析，但是頻道資源無法被順利獲取。 
  
  簡單來說，可能是該頻道本身沒有東西，或是有權限管制我這邊訪問不了(頻道被BAN，或是沒有影片或直播紀錄)。
</p>

<h4>步驟二 : 加入收藏</h4>

<p>
  成功獲取該頻道資訊後，可以勾選右上角愛心圖示，將頻道添加到收藏清單
  
  例如，當我們點選愛心後，收藏提示數量為1，表示有新的一筆紀錄。
</p>

![圖片](https://user-images.githubusercontent.com/23102035/128879506-526ff2d5-c520-4136-ac4a-5fbe48d301a0.png)

<h4>步驟三 : 編輯瀏覽收藏</h4>

<p>
  在此可以自定義收藏頻道的名稱、分群方式，或是刪除。
  
  當你編輯完後不要急著離開。要存檔! 要存檔! 要存檔! 
  
  但是，你會發現找不到那存檔鍵，原因是因為你還沒有登入，所以它只會提示你 "請先登入"
  
  於是，請你先點上方那顆最大的按鈕"請先登入"，進入會員頁面完成註冊或登入。
</p>

![圖片](https://user-images.githubusercontent.com/23102035/128887853-eb9a8580-c553-4928-aac2-b886d05c0a59.png)

<h4>步驟四 : 會員登入</h4>
<p>
  註冊會員或登入會員後，頁面會自動跳轉到頻道瀏覽頁面，
  
  此時上方導覽條的會員按鈕旁邊還多了顆綠燈亮起，這表示為已登入狀態
  
  而你剛剛辛苦添加的收藏頻道也自動的被保存起來了。
</p>

![圖片](https://user-images.githubusercontent.com/23102035/128879566-d40c0776-6eec-415c-a521-3dc5cafc4bce.png)

<h3>步驟五 : 自訂頻道分群顯示</h3>
<p>
  大功告成，現在檢查你的瀏覽頁面(主頁)，你會發現星姊的分群不再是 Resident，而是被置頂為 Favorite 的分群中。
</p>

![圖片](https://user-images.githubusercontent.com/23102035/128879590-ade82876-a692-4ad5-a2e7-bc55b82ef900.png)

<h3>補充 : 頻道Tag顯示</h3>
<p>
  在瀏覽頁面(主頁)，搜尋的下方還有三個切換鈕，它能讓你以三種頻道狀態來顯示。
  
  1) live : 顯示"正在直播"的頻道。
  
  2) wait : 顯示"正在等待"的頻道，有些頻道會提前公布下次的直播時間，這時就會有等候室。
  
  3) off  : 顯示"關閉直播"的頻道，當前直播已經關閉，也沒有下次直播時間。
  
</p>

![圖片](https://user-images.githubusercontent.com/23102035/128893817-a01a62a3-5822-49ad-bae9-e8fe9f40eead.png)


