import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';

import Settings from './pages/Settings';

import DefaultLayout from './layout/DefaultLayout';
import Slider from './pages/Slider';
import Dashboard from './pages/Dashboard/Dashboard';
import AddNewSlider from './pages/AddNewSlider';
import Aboutus from './pages/Aboutus';

import Gallery from './pages/Gallery';
import AddNewGallery from './pages/AddNewGallery';

import SignIn from './pages/SignIn';
import ProtectedLayout from './components/ProtectedLayout';

import EditSlider from './pages/EditSlider';

import EditGallery from './pages/EditGallery';

import EditCategory from './pages/EditCategory';
import Category from './pages/Category';
import AddNewCategory from './pages/AddNewCategory';
import Videos from './pages/Videos';
import AddNewVideos from './pages/AddNewVideo';
import EditVideos from './pages/EditVideo';
import BannerVideos from './pages/BannerVideos';
import AddNewBannerVideos from './pages/AddNewBannerVideos';
import EditBannerVideo from './pages/EditBannerVideo';
import Storyteller from './pages/Storyteller';
import AddNewStory from './pages/AddNewStory';
import EditStory from './pages/EditStory';
import MetaData from './pages/MetaData';
import AddNewMetaData from './pages/AddNewMetaData';
import EditMetaData from './pages/EditMetaData';
import ViewCategoryImage from './pages/ViewCategoryImage';
import PublicLayout from './components/PublicLayout';
import AboveFooterContent from './pages/AboveFooterContent';
import AddPageContent from './pages/AddPageContent';
import EditPageContent from './pages/EditPageContent';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<SignIn />} />
      </Route>

      {/* Protected routes wrapped inside DefaultLayout */}
      <Route element={<ProtectedLayout />}>
        <Route element={<DefaultLayout />}>
          <Route
            path="/dashboard"
            element={
              <>
                <PageTitle title=" Dashboard | David Arts " />
                <Dashboard />
              </>
            }
          />
          <Route path="/slider" element={<Slider />} />
          <Route path="/addnewslider" element={<AddNewSlider />} />
          <Route path="/editslider/:id" element={<EditSlider />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/add-new-video" element={<AddNewVideos />} />
          <Route path="/edit-video/:id" element={<EditVideos />} />
          <Route path="/banner-videos" element={<BannerVideos />} />
          <Route
            path="/add-new-banner-video"
            element={<AddNewBannerVideos />}
          />
          <Route path="/edit-banner-video/:id" element={<EditBannerVideo />} />
          <Route path="/story-tellers" element={<Storyteller />} />
          <Route path="/add-new-story" element={<AddNewStory />} />
          <Route path="/edit-story/:id" element={<EditStory />} />
          <Route path="/metadata" element={<MetaData />} />
          <Route path="/add-new-metadata" element={<AddNewMetaData />} />
          <Route path="/edit-metadata/:id" element={<EditMetaData />} />
          <Route
            path="/view-category-image/:id"
            element={<ViewCategoryImage />}
          />

          <Route path="/gallery" element={<Gallery />} />
          <Route path="/add-new-gallery" element={<AddNewGallery />} />
          <Route path="/edit-gallery/:id" element={<EditGallery />} />
          <Route path="/category" element={<Category />} />
          <Route path="/add-new-category" element={<AddNewCategory />} />
          <Route path="/edit-category/:id" element={<EditCategory />} />

          <Route
            path="/about-us"
            element={
              <>
                <PageTitle title="Profile | David Arts " />
                <Aboutus />
              </>
            }
          />
          <Route path="/contents" element={<AboveFooterContent />} />
          <Route path="/add-page-content" element={<AddPageContent />} />
          <Route path="/edit-page-content/:id" element={<EditPageContent />} />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | David Arts " />
                <Settings />
              </>
            }

            
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
