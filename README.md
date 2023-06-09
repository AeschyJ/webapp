# 動物救援指引網站 (浪浪Helper)
**主旨為當大家遇到受傷、生病、或流浪動物該如何處理的指引網站。**

前端預覽可至 https://AeschyJ.github.io/WEBAPP/React/build

## 功能

1. **傷救指引**: 針對鳥類、貓和狗。 對動物狀況的快速評估提供了基於用戶以多項選擇查詢形式輸入的詳細信息的指南。

2. **貼文功能**: 旨在供用戶發布與動物相關的問題、新聞等。可上傳圖片。

3. **用戶認證**: 該應用程序支持用戶註冊和身份驗證，允許用戶創建帳戶並登錄以訪問帖子功能。

## 使用的技術
- 前端框架：React
- 外型套件：React-Bootstrap
- 後端框架：flask、flask_restful
- 登入套件：flask_jwt
- 資料庫：SQLite

## 安裝 
要在本地安裝和運行該應用程序，請按照以下步驟操作：

1. 將存儲庫克隆到本地計算機：
   ```
   git clone https://github.com/AeschyJ/webapp.git
   ```

2. 導航到項目目錄：
   ```
   cd User/username/path/to/webapp
   ```

### 激活前端
3. 使用 npm 或 yarn 安裝依賴項：
   ```
   npm install
   ```

4. 啟動開發服務器：
   ```
   npm start
   ```

5. 打開您的網絡瀏覽器並訪問“http://localhost:3000”以訪問該應用程序。

### 開啟後端
6. 激活虛擬環境：
   ```
   source User/username/path/to/webapp/Backend/venv/bin/activate
   ```

7. 安裝 flask:
   ```
   pip install flask flask-cors flask-SQLAlchemy
   ```

8. 開始:
   ```
   python3 app.py
   ```

## 支持的顯示
任何屏幕尺寸

## 參考資料
- 遇到犬貓車禍怎麼辦?黃金五步驟即時救毛孩(全國動物醫院) ：https://www.vet.com.tw/news/knowledge-car-accident-0126 
- 我發現有遊蕩在外動物受傷受困，該怎麼辦?(台北市動物保護處)： https://www.tcapo.gov.taipei/News_Content.aspx?n=10457D24D71EC09E&s=F1B 68E7E6DE5BC13 
- 遇到受傷的流浪貓狗，沒經驗的你可以如何處理?(汪喵知識教室) ：https://www.dogcatstar.com/blog_straydogcat/ 
- 如果於街頭發現流浪犬、貓受傷怎麼辦?動物後續處置為何?(桃園市政信箱) ：https://taotalk.tycg.gov.tw/main/PageCtrl?p=k_2&KBId=KB2017022313614 
- What to Do if You Find a Stray Dog or Cat：https://www.peta.org/features/what-to-do-find-stray-dog-or-cat/ 
- Common Injuries in Dogs and How to Treat Them(The Spruce Pet)：https://www.thesprucepets.com/ 
- How to Take Care of an Injured Stray Puppy(wiki How)： https://www.wikihow.com/Take-Care-of-an-Injured-Stray-Puppy 
- How to Help an Injured or Ill Stray Cat in 5 Steps(Tails & Tips)：https://lizskittybootcamp.com/2021/03/03/help-injured-ill-stray-cat/ 
- 看到疑似受傷或不會飛的野鳥怎麼辦?(中華民國野鳥協會)：https://www.bird.org.tw/basicpage/117 
- 撿到野鳥怎麼辦?(台北市野鳥協會)：https://www.wbst.org.tw/ambulance-birds 

API document可查看 https://app.swaggerhub.com/apis-docs/GRON3312/StrayAnimal/1.0.0

若有修改API可透過 https://app.swaggerhub.com/apis/GRON3312/StrayAnimal/1.0.0 更改上方頁面，或在程式碼部分標註
