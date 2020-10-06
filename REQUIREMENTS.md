# REQUIREMENTS

## Feature

- [태그 불러오기](https://github.com/gothinkster/realworld/tree/master/api#get-tags)
- 사용자
  - [로그인](https://github.com/gothinkster/realworld/tree/master/api#authentication)
  - [회원가입](https://github.com/gothinkster/realworld/tree/master/api#registration)
  - [정보 가져오기 (인증)](https://github.com/gothinkster/realworld/tree/master/api#get-current-user)
  - [정보 수정 (인증)](https://github.com/gothinkster/realworld/tree/master/api#update-user)

- 프로필
  - [가져오기](https://github.com/gothinkster/realworld/tree/master/api#get-profile)
  - [팔로우 (인증)](https://github.com/gothinkster/realworld/tree/master/api#follow-user)
  - [팔로우 취소 (인증)](https://github.com/gothinkster/realworld/tree/master/api#unfollow-user)
- [아티클 목록 가져오기](https://github.com/gothinkster/realworld/tree/master/api#list-articles)
  - 태그별
  - 유저별
  - 좋아요별
  - 개수별
  - 페이지별
- [피드 아티클 목록 가져오기 (인증)](https://github.com/gothinkster/realworld/tree/master/api#feed-articles)
  - 개수별
  - 페이지별
- 아티클
  - [가져오기](https://github.com/gothinkster/realworld/tree/master/api#get-article)
  - [등록하기 (인증)](https://github.com/gothinkster/realworld/tree/master/api#create-article)
  - [수정하기 (인증)](https://github.com/gothinkster/realworld/tree/master/api#update-article)
  - [삭제하기 (인증)](https://github.com/gothinkster/realworld/tree/master/api#delete-comment)
  - [좋아요 (인증)](https://github.com/gothinkster/realworld/tree/master/api#favorite-article)
  - [좋아요 취소 (인증)](https://github.com/gothinkster/realworld/tree/master/api#unfavorite-article)
  - 댓글
    - [가져오기](https://github.com/gothinkster/realworld/tree/master/api#get-comments-from-an-article)
    - [등록하기 (인증)](https://github.com/gothinkster/realworld/tree/master/api#add-comments-to-an-article)
    - [삭제하기 (인증)](https://github.com/gothinkster/realworld/tree/master/api#delete-article)

## Requirements By Page

- [ ] 배포 버전 확인

- Header
  - [x] 좌측 conduit 클릭시 **홈 페이지** 이동
  - [x] 우측 Home 클릭시 **홈 페이지** 이동
  - [x] 우측 Sign in 클릭시 **로그인 페이지** 이동
  - [x] 우측 Sign up 클릭시 **회원가입 페이지** 이동

- Header (인증)
  - [x] 좌측 conduit 클릭시 **홈 페이지** 이동
  - [x] 우측 Home 클릭시 **홈 페이지** 이동
  - [x] 우측 New Article 클릭시 **아티클 등록 페이지** 이동
  - [x] 우측 Settings 클릭시 **정보 수정 페이지** 이동
  - [x] 우측 유저 정보 영역 클릭시 **유저 정보 페이지** 이동

- Footer
  - [x] 좌측 conduit 클릭시 **홈 페이지** 이동
  - [x] Thinkster 클릭시 **https://thinkster.io** 이동

- Login Page
  - [ ] 에러 발생시 인풋 상단에 오류 정보 표기
  - [x] Need an account? 클릭시 **회원 가입 페이지** 이동
  - [x] 정보 입력 후 로그인시 **홈 페이지** 이동

- Register Page
  - [ ] 에러 발생시 인풋 상단에 오류 정보 표기
  - [x] Have an account? 클릭시 **로그인 페이지** 이동
  - [x] 정보 입력 후 회원가입시 **홈 페이지** 이동

- Settings Page (인증)
  - [ ] 에러 발생시 인풋 상단에 오류 정보 표기
  - [x] Update Settings 클릭시 ``정보 수정`` 후 **홈 페이지** 이동
  - [x] Or click here to logout. 클릭시 로그아웃 후 **홈 페이지** 이동

- Profile Page
  - [x] My Posts 클릭시 `{유저} 아티클 목록 불러오기`
  - [x] Favorited Posts 클릭시 `{유저}가 좋아하는 아티클 목록 불러오기`
  - 아티클 목록
    - [x] 컨텐츠 영역 클릭시 **아티클 상세 페이지**로 이동
    - [x] 태그 클릭시 **아티클 상세 페이지**로 이동
    - [x] 유저 영역 클릭시 아티클 작성한 **유저 정보 페이지**로 이동
    - 좋아요
      - [x] Outline 좋아요 클릭시 `로그인 페이지 이동`
      - [x] Fill 좋아요 클릭시 `로그인 페이지 이동`

- Profile Page (인증)
  - [x] My Post 클릭시 `{유저} 아티클 목록 불러오기`
  - [x] Favorited Post 클릭시 `{유저}가 좋아하는 아티클 목록 불러오기`
  - [x] Edit Profile Settings 클릭시 **정보 수정 페이지** 이동 (로그인 유저의 프로필일때만 노출)
  - [x] Follow {유저} 클릭시 `팔로우` (로그인 유저의 프로필이 아닐때만 노출)
  - [x] Unfollow {유저} 클릭시 `팔로우 취소` (로그인 유저의 프로필이 아닐때만 노출)
  - 아티클 목록
    - [x] 컨텐츠 영역 클릭시 **아티클 상세 페이지**로 이동
    - [x] 태그 클릭시 **아티클 상세 페이지**로 이동
    - [x] 유저 영역 클릭시 아티클 작성한 **유저 정보 페이지**로 이동
    - 좋아요
      - [x] Outline 좋아요 클릭시 `좋아요`
      - [x] Fill 좋아요 클릭시 `좋아요 취소`

- Home Page
  - 인기 태그
    - [x] 목록 불러오기
    - [x] 개별 태그 클릭시 `태그별 아티클 목록 불러오기`
  - 피드
    - [x] Global Feed 클릭시 `전체 아티클 목록 불러오기`
  - 전체 아티클 목록
    - [x] 컨텐츠 영역 클릭시 **아티클 상세 페이지**로 이동
    - [x] 태그 클릭시 **아티클 상세 페이지**로 이동
    - [x] 유저 영역 클릭시 아티클 작성한 **유저 정보 페이지**로 이동
    - [x] 좋아요 클릭시 **로그인 페이지** 이동
    - [x] 페이지 버튼 클릭시 `페이지별 아티클 목록 불러오기`
    - 좋아요
      - [x] Outline 좋아요 클릭시 `로그인 페이지 이동`
      - [x] Fill 좋아요 클릭시 `로그인 페이지 이동`

- Home Page (인증)
  - 인기 태그
    - [x] 목록 불러오기
    - [x] 개별 태그 클릭시 `태그별 아티클 목록 불러오기`
  - 피드
    - [x] Global Feed 클릭시 `전체 아티클 목록 불러오기`
    - [x] Your Feed 클릭시 `피드별 아티클 목록 불러오기`
    - [ ] Your Feed 없을 시 "No articles are here... yet." 노출
  - 전체 아티클 목록
    - [x] 컨텐츠 영역 클릭시 **아티클 상세 페이지**로 이동
    - [x] 태그 클릭시 **아티클 상세 페이지**로 이동
    - [x] 유저 영역 클릭시 아티클 작성한 **유저 정보 페이지**로 이동
    - [x] 페이지 버튼 클릭시 `페이지별 아티클 목록 불러오기`
    - 좋아요
      - [x] Outline 좋아요 클릭시 `좋아요`
      - [x] Fill 좋아요 클릭시 `좋아요 취소`

- Editor 등록 & 수정 Page (인증)
  - [x] 수정시 기존 아티클 정보 불러온 후 노출
  - [ ] 에러 발생시 인풋 상단에 오류 정보 표기
  - [x] 제목 입력
  - [x] 정보 입력
  - [x] 내용 입력
  - 태그
    - [x] 태그 입력 후 엔터시 하단에 태그 목록 생성
    - [x] 태그 목록의 X 클릭시 태그 삭제

- Article 상세 Page
  - [x] 유저 영역 클릭시 아티클 작성한 **유저 정보 페이지**로 이동
  - [x] 하단 Sign in 클릭시 **로그인 페이지** 이동
  - [x] 하단 Sign up 클릭시 **회원가입 페이지** 이동

- Article 상세 Page (인증)
  - [x] 유저 영역 클릭시 아티클 작성한 **유저 정보 페이지**로 이동
  - [x] Follow {유저} 클릭시 `팔로우`
  - [x] Unfollow {유저} 클릭시 `팔로우 취소`
  - [ ] Favorite Article 클릭시 `좋아요` (선택사항)
  - [ ] Unavorite Article 클릭시 `좋아요 취소` (선택사항)
  - [x] Edit Article 클릭시 `아티클 수정` (아티클 작성자에게만 노출) (선택사항)
  - [x] Delete Article 클릭시 `아티클 삭제` (아티클 작성자에게만 노출) (선택사항)
  - 댓글
    - [x] 유저 영역 클릭시 댓글 작성한 **유저 정보 페이지**로 이동
    - [ ] 작성 후 에러 발생시 인풋 상단에 오류 정보 표기
    - [x] 작성 후 Post Comment 클릭시 `댓글 등록`
    - [x] 작성한 댓글의 휴지통 아이콘 클릭시 `댓글 삭제` (댓글 작성자에게만 노출)

## Resource

- RealWorld Guide
  - https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md
- RealWorld example apps
  - https://github.com/gothinkster/realworld
- CSS
  - http://demo.productionready.io/main.css
- API Spec
  - https://github.com/gothinkster/realworld/blob/master/api/README.md
- Page URL
  - Home page (URL: / )
  - Sign in/Sign up pages (URL: /login, /register )
  - Settings page (URL: /settings )
  - Editor page to create/edit articles (URL: /editor, /editor/article-slug-here )
  - Article page (URL: /article/{article-slug-here} )
  - Profile page (URL: /profile/{username}, /profile/{username}/favorites )

