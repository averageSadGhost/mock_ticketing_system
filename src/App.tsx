import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { LanguageProvider } from './i18n';
import { Layout } from './components/layout';
import {
  Home,
  SearchResults,
  SeatSelection,
  Booking,
  Payment,
  Confirmation,
  MyTickets,
  Login,
  Register,
} from './pages';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <BookingProvider>
          <Routes>
            {/* Auth pages without layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Pages with layout */}
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/search"
              element={
                <Layout>
                  <SearchResults />
                </Layout>
              }
            />
            <Route
              path="/seats"
              element={
                <Layout>
                  <SeatSelection />
                </Layout>
              }
            />
            <Route
              path="/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
            <Route
              path="/payment"
              element={
                <Layout>
                  <Payment />
                </Layout>
              }
            />
            <Route
              path="/confirmation"
              element={
                <Layout>
                  <Confirmation />
                </Layout>
              }
            />
            <Route
              path="/my-tickets"
              element={
                <Layout>
                  <MyTickets />
                </Layout>
              }
            />
            </Routes>
          </BookingProvider>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
