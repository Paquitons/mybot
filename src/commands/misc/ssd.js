const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
    EmbedBuilder,
  } = require('discord.js');

module.exports = {
    name: 'ssd',
    description: 'Hosts an SSD!',
  
    callback: async (client, interaction) => {
      await interaction.reply({ content: "Hosted an SSD", ephemeral: true });
        const vcchannel = await client.channels.fetch("1135103587404480522");
        const sessionschannel = await client.channels.fetch("1135117520764944465");
        const logschannel = await client.channels.fetch("1135235682365878282");
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
        const userId = interactionUser.id
          // Edit the channel's name
          vcchannel.setName("Online: 🔴")
            .then(updatedChannel => {
              console.log(`Channel name changed to: ${updatedChannel.name}`);
            })
  
          const sessionembed = new EmbedBuilder()
          .setColor('#6728d2')
          .setTitle('- Server Shutdown! -')
          .setDescription('The server has now been **SHUT DOWN** due to insufficient staff, low player numbers, or the server being in a state of chaos!\n\n Make sure to join back in the next SSU!')
          .setImage('https://cdn.discordapp.com/attachments/1135155489794166814/1135156320442515547/jackson_county_banner.png')
          .setThumbnail('https://cdn.discordapp.com/attachments/1135109235533959239/1135524550830981160/JCBR.gif');
  
          const logsembed = new EmbedBuilder()
          .setColor('#6728d2')
          .setTitle('SSU Logs')
          .setDescription(`<@${userId}> has hosted an SSD.`);
  
        // Send the embed to the specified channel
        await sessionschannel.send("<@&1135352580843778068>")
        await sessionschannel.send({ embeds: [sessionembed] })
        await logschannel.send({ embeds: [logsembed] })
      },
  };