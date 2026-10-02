import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import ViewSingleBook from "./pages/ViewSingleBook";
import { Slide, ToastContainer } from "react-toastify";
import AdminBooks from "./admin/pages/AdminBooks";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminSettings from "./admin/pages/AdminSettings";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth isFromRegister={true} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book/:id/viewBook" element={<ViewSingleBook />} />
        <Route path="/admin-books" element = {<AdminBooks/>}/>
        <Route path="/admin" element = {<AdminDashboard/>}/>
        <Route path='/admin-settings' element= {<AdminSettings/>}/>
        <Route path='/payment-success' element={<PaymentSuccess/>}/>
         <Route path='/payment-failure' element={<PaymentFailure/>}/>
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </>
  );
};

export default App;
