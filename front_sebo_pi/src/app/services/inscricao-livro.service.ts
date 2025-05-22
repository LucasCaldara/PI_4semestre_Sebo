import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Livro } from '../entities/livro';

@Injectable({
  providedIn: 'root',
})
export class InscricaoLivroService {
  /** Stream com a lista dos livros em que o usuário se inscreveu. */
  private inscritos$ = new BehaviorSubject<Livro[]>([]);

  /** Retorna a lista como observable somente-leitura. */
  getInscritos(): Observable<Livro[]> {
    return this.inscritos$.asObservable();
  }

  /** Adiciona livro se ainda não estiver inscrito. */
  inscrever(livro: Livro): void {
    const lista = this.inscritos$.value;
    if (!lista.find(l => l.id === livro.id)) {
      this.inscritos$.next([...lista, livro]);
    }
  }
}
