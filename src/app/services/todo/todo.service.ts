import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Todo } from 'src/app/interfaces/todo';
import { StorageKeys } from '../storage/storage-keys.enum';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(public storage: StorageService) { }

  public list(): Observable<Todo> {  // list
    return this.storage.get<Todo[]>(StorageKeys.LocalData)
      .pipe(switchMap(data => data));
  }

  show(id): Observable<Todo> {  // show
    return this.storage.get<Todo[]>(StorageKeys.LocalData)
      .pipe(switchMap(data => from(data)), filter(data => id === data.id)
      );
  }


  public save(todo: Todo): Observable<Todo> {
    return this.storage.get<Todo[]>(StorageKeys.LocalData)
      .pipe(switchMap((existingtasks) => {
        todo.id = this.uniqueId();
        existingtasks.push(todo);
        return this.storage.set(StorageKeys.LocalData, existingtasks);
      }))
      .pipe(map(() => todo));
  }

  public update(todo: Todo): Observable<Todo> {

    return this.storage.get<Todo[]>(StorageKeys.LocalData)
      .pipe(switchMap((existingtasks) => {
        const index = existingtasks.findIndex(existingtask => existingtask.id === todo.id);
        existingtasks[index] = todo;
        console.log(existingtasks);
        this.storage.set(StorageKeys.LocalData, existingtasks);
        return of(todo);
      }));
  }

  public updateCompletedTask(todo: Todo): Observable<Todo> {

    return this.storage.get<Todo[]>(StorageKeys.LocalData)
      .pipe(switchMap((existingtasks) => {
        const index = existingtasks.findIndex(existingtask => existingtask.id === todo.id);
        existingtasks[index].complete = !todo.complete;
        this.storage.set(StorageKeys.LocalData, existingtasks);
        return of(todo);
      }));
  }

  public remove(id): Observable<Todo[]> {  // remove
    return this.storage.get<Todo[]>(StorageKeys.LocalData)
      .pipe(switchMap(existingdata => {
        const index = existingdata.findIndex(existingdata => existingdata.id === id);
        existingdata.splice(index, 1);
        this.storage.set(StorageKeys.LocalData, existingdata);
        return of(existingdata);
      }));

  }

  private uniqueId(): string {
    return Math.random().toString(36).replace('0.', '');
  }


  /**
   * Setups empty list of todoTask in storage if not exists
   */
  public setupTasksList(): Promise<Todo[]> {
    return this.storage.get<Todo[] | null>(StorageKeys.LocalData)
      .pipe(switchMap(data => {
        if ((!!data && Array.isArray(data))) {
          return of(data);
        }
        return this.storage.set(StorageKeys.LocalData, [])
          .pipe(map(() => []));

      }))
      .toPromise();
  }

  // Toggle todo complete
  // toggleTodoComplete(todo: Todo){
  //   let updatedTodo = this.update(todo.id, {
  //     complete: !todo.complete
  //   });
  //   return updatedTodo;
  // }


}
