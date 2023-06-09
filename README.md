# 動物救援指引網站 (浪浪Helper)
**主旨為當大家遇到受傷、生病、或流浪動物該如何處理的指引網站。**

前端預覽可至 https://AeschyJ.github.io/WEBAPP/React/build

## 功能

1. **傷救指引**: 針對受傷或狀況不明的動物給予處置建議。使用者可以視動物的狀況填寫表單即能得到指南以及適合的動物醫院或動物收容所。

2. **貼文功能**: 旨在供使用者分享關於動物的處理經驗文章與照片。

3. **會員服務**: 此網站提供使用者註冊與登入的功能，允許會員在登入的情況下貼文。


## 使用的技術
- 前端框架：React
- 外型套件：React-Bootstrap
- 後端框架：flask、flask_restful
- 登入套件：flask_jwt
- 資料庫：SQLite


## 安裝與執行 
要安裝和執行此網站，請按照以下步驟操作：

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/AeschyJ/webapp.git
   ```
2. Navigate to the project directory:
   ```
   cd /Users/username/path/to/webapp
   ```
### Start the front-end
3. Install the dependencies using npm or yarn:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open your web browser and visit http://localhost:3000 to access the app.

### Run the back-end
6. Navigate to the back-end folder:
   ```
   cd /Users/username/path/to/webapp/Backend
   ```
7. Install and activate virtual environment:
   ```
   sudo pip3 install virtualenv
   virtualenv venv 
   source /Users/username/path/to/webapp/Backend/venv/bin/activate
   ```
7. Install flask:
   ```
   python -m pip install flask flask_restful flask_cors flask-SQLAlchemy flask_jwt_extended
   ```
8. Run:
   ```
   python3 app.py
   ```

## 支持的顯示器
任何尺寸的螢幕


## 議題參考資料
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
