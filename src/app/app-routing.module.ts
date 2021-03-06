import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'technologies', pathMatch: 'full' },
  { path: 'technologies', loadChildren: './pages/technologies/technologies.module#TechnologiesPageModule' },
  { path: 'cloudinary-upload', loadChildren: './pages/cloudinary/upload/upload.module#UploadPageModule' },
  { path: 'cloudinary-load-by-tag', loadChildren: './pages/cloudinary/load-by-tag/load-by-tag.module#LoadByTagPageModule' },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
