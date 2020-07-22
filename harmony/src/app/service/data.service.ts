
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  allPost: Observable<Post[]>;

  // collection object <--> database
  postCollection: AngularFirestoreCollection<Post>;

  constructor(private fst: AngularFirestore) {
    this.postCollection = fst.collection<Post>('posts');
  }

  private retrievePosts(){
    this.allPost = this.postCollection.valueChanges();  // will fire everything a value is changed in DB
  }

  sendPost(post){
    var item = Object.assign({}, post); // copy post to object item
    this.postCollection.add(item);
  }

  getAllPosts() {
    this.retrievePosts();
    return this.allPost;
  }
}
