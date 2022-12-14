<template>
  <div>
    <div class="board">
      <table>
        <colgroup>
          <col style="width: 18.5%" />
          <col style="width: " />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">제목</th>
            <td class="title">{{ list.title }}</td>
          </tr>
          <tr>
            <th scope="row">작성자</th>
            <td>{{ list.author }}</td>
          </tr>
          <tr>
            <th scope="row">내용</th>
            <td class="content">{{ list.content }}</td>
          </tr>
          <tr>
            <th scope="row">작성일자</th>
            <td v-if="list.created_at === list.modified_at">
              {{ list.created_at }}
            </td>
            <td v-else>{{ list.modified_at }} (수정됨)</td>
          </tr>
        </tbody>
      </table>
      <div class="buttons">
        <div class="right">
          <button class="button" @click="modifyPage">수정</button>
          <button class="button" @click="deleteBoard">삭제</button>
        </div>
      </div>

      <!---->
      <div class="a">
        <div v-for="comment in comments" :key="comment.id">
          <table>
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 35%" />
              <col style="width: 25%" />
              <col style="width: 10%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="col">{{ comment.author }}</th>
                <td>{{ comment.content }}</td>
                <td>{{ comment.created_at }}</td>
                <td>
                  <button @click="deleteComment(comment.id)">삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <table>
        <colgroup>
          <col style="width: 18.5%" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">작성자</th>
            <td>
              <input
                type="text"
                placeholder="아이디를 입력하세요."
                v-model="postComment.author"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">댓글</th>
            <td>
              <textarea
                rows="2"
                placeholder="댓글을 입력하세요."
                v-model="postComment.content"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="buttons">
        <div class="right">
          <button class="button blue" @click="registComment">댓글달기</button>
        </div>
      </div>

      <!---->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      list: {}, //서버에서 게시판 데이터를 불러와 담음
      comments: [], // 서버에서 댓글 정보를 불러와 담음
      postComment: {
        post_id: this.$route.params.id,
        created_at: new Date().toLocaleString(),
        author: "",
        content: "",
      },
    };
  },
  //랜더링 전에 실행 data list에 값을 넣어 주기 위하여
  created() {
    axios
      .get(`http://192.168.70.212/posts/${this.$route.params.id}`)
      .then((response) => {
        response.data;
        this.list = response.data;
      });
    this.getComments();
  },

  methods: {
    // 게시물 삭제 버튼
    deleteBoard() {
      axios
        .delete(`http://192.168.70.212/posts/${this.$route.params.id}`)
        .then((response) => {
          console.log(response);
        })
        .then(() => {
          alert("삭제되었습니다.");
        })
        .then(() => this.$router.push({ name: "home" }))
        .catch((err) => console.log(err));
    },
    modifyPage() {
      //수정버튼눌렀을 시 양식 페이지 이동
      this.$router.push({ name: "Modify" });
    },
    getComments() {
      axios
        .get(`http://192.168.70.212/comments?post_id=${this.$route.params.id}`) //post_id가 현페이지 id와 같은것만
        .then((res) => {
          res.data;
          this.comments = res.data;
        });
    },
    registComment() {
      axios
        .post(`http://192.168.70.212/comments`, this.postComment)
        .then(() => {
          alert("댓글이 등록 되었습니다.");
        })
        .then(() => this.clear())
        .then(() => this.$router.go(0))
        .catch((err) => console.log(err));
    },
    deleteComment(commentId) {
      axios
        .delete(`http://192.168.70.212/comments/${commentId}`) // post_id(게시물의 id)가 아닌 댓글의 부여된 id를 삭제
        .then(() => {
          alert("댓글이 삭제 되었습니다.");
        })
        .then(() => this.$router.go(0))
        .catch((err) => console.log(err));
    },
    clear() {
      this.postComment.author = "";
      this.postComment.content = "";
    },
  },
};
</script>

<style>
.a {
  margin-bottom: 50px;
}
.board {
  width: 800px;
  margin: 20px auto;
}
.board table {
  width: 100%;
  border-top: 1px solid #ccc;
  border-spacing: 0;
}
.board table th {
  padding: 8px 10px 10px 10px;
  vertical-align: middle;
  color: #1d4281;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  background: #f8f8f8;
}
.board table td {
  padding: 7px 20px 9px 20px;
  text-align: left;
  vertical-align: middle;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  line-height: 150%;
}
.board table td.title {
  font-weight: bold;
}
.board table td.content {
  height: 200px;
  vertical-align: top;
}
</style>
