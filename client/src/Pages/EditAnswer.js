// import Header from '../Component/Header';
// import Nav from '../Component/Nav';
// import Footer from '../Component/Footer';
// import styled from 'styled-components';
// import axios from 'axios';

// const EditContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   padding: 20px;
//   margin-top: var(--top-bar-allocated-space);
// `;

// const EditAnswer = () => {
//   const handlePatch = () => {
//     axios
//       .patch(`/questions/${questionId}/answers/${answerId}`, {
//         content: answer.content,
//         memberId: answer.memberId,
//         questionId: answer.questionId,
//       })
//       .then(() => {
//         navigate(`/questions/${questionId}`);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <>
//       <Header></Header>
//       <Nav></Nav>
//       <EditContainer></EditContainer>
//       <Footer></Footer>
//     </>
//   );
// };
// export default EditAnswer;
