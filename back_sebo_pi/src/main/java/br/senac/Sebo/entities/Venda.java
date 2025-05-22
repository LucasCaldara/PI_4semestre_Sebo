package br.senac.Sebo.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class Venda implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = true, foreignKey = @ForeignKey(name = "fk_venda_cliente"))
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Cliente cliente;


    @ManyToMany
    private List<Livro> livros;

    @Column
    private Date dataVenda;

    @Column
    private double valorTotal;

    public Venda() {
    }

    public Venda(Cliente cliente, List<Livro> livros, Date dataVenda, double valorTotal) {
        this.cliente = cliente;
        this.livros = livros;
        this.dataVenda = dataVenda;
        this.valorTotal = valorTotal;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<Livro> getLivros() {
        return livros;
    }

    public void setLivros(List<Livro> livros) {
        this.livros = livros;
    }

    public Date getDataVenda() {
        return dataVenda;
    }

    public void setDataVenda(Date dataVenda) {
        this.dataVenda = dataVenda;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }

    @Override
    public String toString() {
        return "Venda [id=" + id + ", cliente=" + cliente.getNome() + ", dataVenda=" + dataVenda + ", valorTotal=" + valorTotal + "]";
    }
}
