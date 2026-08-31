// No arquivo de cadastro:
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name: nomeInseridoPeloUsuario, // <--- Isso salva o nome correto no Supabase
    },
  },
})

// Também pode salvar em cache para uso imediato:
localStorage.setItem('nutrisaas-nome', nomeInseridoPeloUsuario)